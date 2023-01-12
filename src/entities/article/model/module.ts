import Vue from "vue"

import articleApi from "../api"

import { commentApi, Comment, WrittenComment } from "@/entities/comment"

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
        const res = await articleApi.getItem(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async getFeed(
        params: Pagination = { limit: 20, offset: 0 }
    ): Promise<IArticleList> {
        const res = await articleApi.getFeed(params)
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
        const res = await articleApi.getList(params)
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async create(params: WrittenArticle): Promise<Article> {
        const res = await articleApi.create(params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async update(payload: {
        slug: ArticleSlug
        params: UpdateArticle
    }): Promise<Article> {
        const res = await articleApi.update(payload.slug, payload.params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async delete(slug: ArticleSlug): Promise<void> {
        await articleApi.remove(slug)
    }

    @Action()
    async addToFavorites(slug: ArticleSlug): Promise<void> {
        const res = await articleApi.addToFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async removeFromFavorites(slug: ArticleSlug): Promise<void> {
        const res = await articleApi.removeFromFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async fetchComments(slug: string): Promise<void> {
        const comments = await commentApi.getComments(slug)
        this.addMultipleCommentsToCache({ slug, comments })
    }

    @Action()
    async addComment(payload: {
        slug: ArticleSlug
        params: WrittenComment
    }): Promise<void> {
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
        await commentApi.deleteComment(payload.slug, payload.commentId)
    }
}
