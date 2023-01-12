import Vue from "vue"

import articleApi from "../api"

import {
    commentApi,
    Comment,
    WrittenComment,
    CommentId,
} from "@/entities/comment"

import { Action, Getter, Mutation, State } from "vuex-simple"
import {
    IArticleGetListRequestParams,
    IArticleList,
} from "@/services/realWorldApi/models"

import { ArticleSlug, Article, UpdateArticle, WrittenArticle } from "../types"

export class ArticleModule {
    @State() pool: Record<string, Article> = {}

    @State() commentPool: Record<string, Record<number, Comment>> = {}

    // @State()
    // poolByTags: Record<string, string[]> = {}
    // @State()
    // active = null
    // @Mutation()
    // updatePool(pool: any) {
    //     this.pool = {
    //         ...this.pool,
    //         ...pool,
    //     }
    // }
    // @Mutation()
    // updatePoolByTags(tag: string, slugs: string[]) {
    //     Vue.set(this.poolByTags, tag, slugs)
    // }
    // @Getter()
    // get articleBySlug() {
    //     return (slug: string) => this.pool[slug]
    // }
    // @Getter()
    // get articlesByTag() {
    //     return (tag: string) =>
    //         this.poolByTags[tag].map(slug => this.pool[slug])
    // }

    // @State()
    // private _articlesCache: Record<string, Article> = {}

    @Getter()
    get articlesCache(): Record<string, Article> {
        return this.pool
    }

    @Getter()
    get commentsCache(): Record<string, Record<number, Comment>> {
        return this.commentPool
    }

    @Mutation()
    addArticleToCache(article: Article): void {
        const cachedArticle = this.pool[article.slug]

        if (!cachedArticle || article.updatedAt >= cachedArticle.updatedAt) {
            Vue.set(this.pool, article.slug, article)
        }
        // Profile.addProfileToCache(article.author)
    }

    /** @deprecated */
    @Mutation()
    clearArticlesCache(): void {
        // this.pool = {}
    }

    /** @deprecated */
    @Mutation()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeArticleFromCache(_slug: ArticleSlug): void {
        // Vue.delete(this.pool, slug)
    }

    @Mutation()
    addCommentToCache(payload: { slug: ArticleSlug; comment: Comment }): void {
        if (!this.commentPool[payload.slug]) {
            Vue.set(this.commentPool, payload.slug, {})
        }
        Vue.set(
            this.commentPool[payload.slug],
            payload.comment.id,
            payload.comment
        )
        // Profile.addProfileToCache(payload.comment.author)
    }

    /** @deprecated */
    @Mutation()
    clearCommentsCache(): void {
        // this.commentPool = {}
    }

    /** @deprecated */
    @Mutation()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeCommentFromCache(_payload: {
        slug: ArticleSlug
        id: CommentId
    }): void {
        // Vue.delete(this.commentPool[payload.slug], payload.id)
    }

    @Action()
    addMultipleCommentsToCache(payload: {
        slug: string
        comments: Comment[]
    }): void {
        payload.comments.forEach(comment =>
            this.addCommentToCache({ slug: payload.slug, comment })
        )
    }

    @Action()
    addMultipleArticlesToCache(articles: Article[]): void {
        articles.forEach(article => this.addArticleToCache(article))
    }

    @Action()
    async fetchSingle(slug: ArticleSlug): Promise<void> {
        // const res = await ArticleGet(slug)
        const res = await articleApi.getItem(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async getFeed(
        params: Pagination = { limit: 20, offset: 0 }
    ): Promise<IArticleList> {
        // const res = await ArticleGetFeed(params)
        const res = await articleApi.getFeed(params)
        // this.clearArticlesCache()
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
        // const res = await ArticleGetList(params)
        const res = await articleApi.getList(params)
        // this.clearArticlesCache()
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async create(params: WrittenArticle): Promise<Article> {
        // const res = await ArticleCreate(params)
        const res = await articleApi.create(params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async update(payload: {
        slug: ArticleSlug
        params: UpdateArticle
    }): Promise<Article> {
        // const res = await ArticleUpdate(payload.slug, payload.params)
        const res = await articleApi.update(payload.slug, payload.params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async delete(slug: ArticleSlug): Promise<void> {
        // await ArticleDelete(slug)
        await articleApi.remove(slug)
        // this.removeArticleFromCache(slug)
    }

    @Action()
    async addToFavorites(slug: ArticleSlug): Promise<void> {
        // const res = await ArticleAddToFavorites(slug)
        const res = await articleApi.addToFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async removeFromFavorites(slug: ArticleSlug): Promise<void> {
        // const res = await ArticleRemoveFromFavorites(slug)
        const res = await articleApi.removeFromFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async fetchComments(slug: string): Promise<void> {
        // const comments = await ArticleGetComments(slug)
        const comments = await commentApi.getComments(slug)
        this.addMultipleCommentsToCache({ slug, comments })
    }

    @Action()
    async addComment(payload: {
        slug: ArticleSlug
        params: WrittenComment
    }): Promise<void> {
        // const comment = await ArticleAddComment(payload.slug, payload.params)
        const comment = await commentApi.addComment(
            payload.slug,
            payload.params
        )
        this.addCommentToCache({ slug: payload.slug, comment })
    }

    @Action()
    async deleteComment(payload: {
        slug: string
        commentId: number
    }): Promise<void> {
        // await ArticleDeleteComment(payload.slug, payload.commentId)
        await commentApi.deleteComment(payload.slug, payload.commentId)
        // this.removeCommentFromCache({
        //     slug: payload.slug,
        //     id: payload.commentId,
        // })
    }
}
