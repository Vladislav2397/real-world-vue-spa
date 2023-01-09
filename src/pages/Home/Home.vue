<template lang="pug">

.home-page
    banner-component
    .container.page: .row
        .col-md-9
            article-list(
                :tabs="tabs"
                :active-tab-id="activeTabId"
                :is-loading="isLoading"
                :feed="activeFeed"
                :items-per-page="itemsPerPage"
                :current-page="currentPage"
                @page-changed="onPageChanged"
                @tab-changed="onTabChanged"
            )
        .col-md-3
            popular-tags(
                @tag-selected="onTagFeedActivated"
            )

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { PopularTags, ArticleList } from "@/widgets/article"
import { Banner } from "./Banner"

import { IFeedTab } from "@/components/CommonFeed.vue"
import IPagination, {
    DEFAULT_ITEMS_PER_PAGE,
    DEFAULT_START_PAGE,
} from "@/services/common/IPagination"
import { IArticleList } from "@/services/realWorldApi/models"
// import Article from "@/store/modules/Article"
// import User from "@/store/modules/User"
import { useModule } from "vuex-simple"

enum FeedType {
    Global = "Global",
    My = "My",
    Tag = "Tag",
}

@Component({
    components: {
        'banner-component': Banner,
        'popular-tags': PopularTags,
        'article-list': ArticleList,
    },
})
export default class Home extends Vue {
    feedTypes: typeof FeedType = FeedType
    isLoading = false
    currentPage = DEFAULT_START_PAGE
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    activeTabId: FeedType = FeedType.My
    activeFeed: IArticleList = { articles: [], articlesCount: 0 }
    activeTag: string | null = null

    get Article() {
        return useModule(this.$store, ['article']) as any
    }

    get User() {
        return useModule(this.$store, ['user']) as any
    }

    get isLoggedIn(): boolean {
        return this.User.isLoggedIn
    }

    get tabs(): IFeedTab[] {
        const res: IFeedTab[] = []

        if (this.isLoggedIn) {
            res.push({
                id: FeedType.My,
                title: "Your Feed",
            })
        }

        res.push({
            id: FeedType.Global,
            title: "Global Feed",
        })

        if (this.activeTag && this.activeTabId === FeedType.Tag) {
            res.push({
                id: FeedType.Tag,
                title: `#${this.activeTag}`,
            })
        }
        return res
    }

    async mounted(): Promise<void> {
        this.activeTabId = this.isLoggedIn ? FeedType.My : FeedType.Global
        await this.fetchFeed()
    }

    async onTabChanged(tabId: FeedType): Promise<void> {
        switch (tabId) {
            case FeedType.My:
            case FeedType.Global:
                this.activeTabId = tabId
                this.currentPage = DEFAULT_START_PAGE
                await this.fetchFeed()
                break
            case FeedType.Tag:
                await this.onTagFeedActivated(this.activeTag || "")
                break

            default:
                throw new Error(`Unexpected tabId: ${tabId}`)
        }
    }

    async onTagFeedActivated(tag: string): Promise<void> {
        this.activeTabId = FeedType.Tag
        this.currentPage = DEFAULT_START_PAGE
        this.activeTag = tag
        await this.fetchFeed()
    }

    async onPageChanged(page: number): Promise<void> {
        this.currentPage = page
        await this.fetchFeed()
    }

    async fetchFeed(): Promise<void> {
        this.isLoading = true
        try {
            const pagination: IPagination = {
                limit: this.itemsPerPage,
                offset: (this.currentPage - 1) * this.itemsPerPage,
            }

            switch (this.activeTabId) {
                case FeedType.Global:
                    this.activeFeed = await this.Article.getList({ ...pagination })
                    break
                case FeedType.Tag:
                    this.activeFeed = await this.Article.getList({
                        tag: this.activeTag as string,
                        ...pagination,
                    })
                    break
                case FeedType.My:
                    this.activeFeed = await this.Article.getFeed(pagination)
                    break
                default:
                    break
            }
        } finally {
            this.isLoading = false
            window.scrollTo(0, 0)
        }
    }
}
</script>
