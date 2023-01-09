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

    .article-preview(
        v-if="feed.articlesCount === 0 && !isLoading"
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

import { Loader, Pagination } from "@/shared/ui"
import { ArticlePreview } from '@/entities/article'

import { IArticle, IArticleList } from "@/services/realWorldApi/models"
import { useModule } from "vuex-simple"
// import Article from "@/store/modules/Article"

export interface IFeedTab {
    id: string
    title: string
}

@Component({
    components: {
        'common-loader': Loader,
        'common-pagination': Pagination,
        'article-preview': ArticlePreview,
    },
})
export default class List extends Vue {
    @Prop({ required: true }) tabs!: IFeedTab[]
    @Prop({ default: "" }) activeTabId!: string
    @Prop({ default: false }) isLoading!: boolean
    @Prop({ required: true }) feed!: IArticleList
    @Prop({ required: true }) itemsPerPage!: number
    @Prop({ required: true }) currentPage!: number

    get Article() {
        return useModule(this.$store, ['article']) as any
    }

    get articlesCache(): Record<string, IArticle> {
        return this.Article.articlesCache
    }

    get articles(): IArticle[] {
        return this.feed.articles.map(
            article => this.articlesCache[article.slug] || article
        )
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
