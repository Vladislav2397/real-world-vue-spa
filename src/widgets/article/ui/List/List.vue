<template lang="pug">

div
    .feed-toggle
        ul.nav.nav-pills.outline-active
            li.nav-item(
                v-for="tab in tabs"
                :key="tab.id"
            )
                a.nav-link(
                    :class="{ active: activeTabId === tab.id }"
                    href="#"
                    @click.prevent="onTabChanged(tab.id)"
                ) {{ tab.title }}

    common-loader(v-if="isLoading")

    article-preview(
        v-else
        v-for="article in articles"
        :key="article.slug"
        :article="article"
    )
        template(
            #actions
        )
            toggle-favorites-button.pull-xs-right(
                :favorited="article.favorited"
                :favorites-count="article.favoritesCount"
                :slug="article.slug"
            )

    .article-preview(
        v-if="isArticlesEmpty"
    ) No articles are here... yet.

    common-pagination(
        v-show="!isLoading"
        :total-items="feed.articlesCount"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        @page-changed="onPageChanged"
    )

</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

import { Loader, Pagination } from "@/shared/ui"
import { ArticlePreview, Article } from "@/entities/article"
import { ArticleFavoritesButton } from "@/features/article"

import { IArticleList } from "@/services/realWorldApi/models"

export interface IFeedTab {
    id: string
    title: string
}

@Component({
    components: {
        "common-loader": Loader,
        "common-pagination": Pagination,
        "article-preview": ArticlePreview,
        "toggle-favorites-button": ArticleFavoritesButton,
    },
})
export default class List extends Vue {
    @Prop({ required: true }) tabs!: IFeedTab[]
    @Prop({ default: "" }) activeTabId!: string
    @Prop({ default: false }) isLoading!: boolean
    @Prop({ required: true }) feed!: IArticleList & { articles: Article[] }
    @Prop({ required: true }) itemsPerPage!: number
    @Prop({ required: true }) currentPage!: number

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get articlesCache(): Record<string, Article> {
        return this.Article.articlesCache
    }

    get articles(): Article[] {
        return this.feed.articles.map(
            article => this.articlesCache[article.slug] || article
        )
    }

    get isArticlesEmpty() {
        return this.feed.articlesCount === 0 && !this.isLoading
    }

    @Emit("tab-changed")
    onTabChanged(tabId: string): string {
        return tabId
    }
    @Emit("page-changed")
    onPageChanged(page: number): number {
        return page
    }
}
</script>
