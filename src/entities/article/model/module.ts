import Vue from "vue"

import articleApi from "../api"

import { Action, Getter, Mutation, State } from "vuex-simple"
import {
    IArticle,
    IArticleAddCommentRequestParams,
    IArticleCreateRequestParams,
    IArticleGetListRequestParams,
    IArticleList,
    IArticleUpdateRequestParams,
    IComment,
} from "@/services/realWorldApi/models"
import IPagination from "@/services/common/IPagination"

export class ArticleModule {
    // @State()
    // pool: Record<string, any> = {}
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

    @State()
    private _articlesCache: Record<string, IArticle> = {}

    @State()
    private _commentsCache: Record<string, Record<number, IComment>> = {}

    @Getter()
    get articlesCache(): Record<string, IArticle> {
        return this._articlesCache
    }

    @Getter()
    get commentsCache(): Record<string, Record<number, IComment>> {
        return this._commentsCache
    }

    @Mutation()
    addArticleToCache(article: IArticle): void {
        const cachedArticle = this._articlesCache[article.slug]
        if (!cachedArticle || article.updatedAt >= cachedArticle.updatedAt) {
            Vue.set(this._articlesCache, article.slug, article)
        }
        // Profile.addProfileToCache(article.author)
    }

    @Mutation()
    clearArticlesCache(): void {
        this._articlesCache = {}
    }

    @Mutation()
    removeArticleFromCache(slug: string): void {
        Vue.delete(this._articlesCache, slug)
    }

    @Mutation()
    addCommentToCache(payload: { slug: string; comment: IComment }): void {
        if (!this._commentsCache[payload.slug]) {
            Vue.set(this._commentsCache, payload.slug, {})
        }
        Vue.set(
            this._commentsCache[payload.slug],
            payload.comment.id,
            payload.comment
        )
        // Profile.addProfileToCache(payload.comment.author)
    }

    @Mutation()
    clearCommentsCache(): void {
        this._commentsCache = {}
    }

    @Mutation()
    removeCommentFromCache(payload: { slug: string; id: number }): void {
        Vue.delete(this._commentsCache[payload.slug], payload.id)
    }

    @Action()
    addMultipleCommentsToCache(payload: {
        slug: string
        comments: IComment[]
    }): void {
        payload.comments.forEach(comment =>
            this.addCommentToCache({ slug: payload.slug, comment })
        )
    }

    @Action()
    addMultipleArticlesToCache(articles: IArticle[]): void {
        articles.forEach(article => this.addArticleToCache(article))
    }

    @Action()
    async fetchSingle(slug: string): Promise<void> {
        // const res = await ArticleGet(slug)
        const res = await articleApi.getItem(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async getFeed(
        params: IPagination = { limit: 20, offset: 0 }
    ): Promise<IArticleList> {
        // const res = await ArticleGetFeed(params)
        const res = await articleApi.getFeed(params)
        this.clearArticlesCache()
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
        // const res = await ArticleGetList(params)
        const res = await articleApi.getList(params)
        this.clearArticlesCache()
        this.addMultipleArticlesToCache(res.articles)
        return res
    }

    @Action()
    async create(params: IArticleCreateRequestParams): Promise<IArticle> {
        // const res = await ArticleCreate(params)
        const res = await articleApi.create(params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async update(payload: {
        slug: string
        params: IArticleUpdateRequestParams
    }): Promise<IArticle> {
        // const res = await ArticleUpdate(payload.slug, payload.params)
        const res = await articleApi.update(payload.slug, payload.params)
        this.addArticleToCache(res)
        return res
    }

    @Action()
    async delete(slug: string): Promise<void> {
        // await ArticleDelete(slug)
        await articleApi.remove(slug)
        this.removeArticleFromCache(slug)
    }

    @Action()
    async addToFavorites(slug: string): Promise<void> {
        // const res = await ArticleAddToFavorites(slug)
        const res = await articleApi.addToFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async removeFromFavorites(slug: string): Promise<void> {
        // const res = await ArticleRemoveFromFavorites(slug)
        const res = await articleApi.removeFromFavorites(slug)
        this.addArticleToCache(res)
    }

    @Action()
    async fetchComments(slug: string): Promise<void> {
        // const comments = await ArticleGetComments(slug)
        const comments = await articleApi.getComments(slug)
        this.addMultipleCommentsToCache({ slug, comments })
    }

    @Action()
    async addComment(payload: {
        slug: string
        params: IArticleAddCommentRequestParams
    }): Promise<void> {
        // const comment = await ArticleAddComment(payload.slug, payload.params)
        const comment = await articleApi.addComment(
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
        await articleApi.deleteComment(payload.slug, payload.commentId)
        this.removeCommentFromCache({
            slug: payload.slug,
            id: payload.commentId,
        })
    }
}
