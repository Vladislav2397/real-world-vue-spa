<template lang="pug">

common-loader(
    v-if="isLoading || !profile"
)
.profile-page(
    v-else
)
    .user-info: .container: .row: .col-xs-12.col-md-10.offset-md-1
        img(
            :src="profile.image"
            class="user-img"
        )
        h4 {{ profile.username }}
        p {{ profile.bio }}

        router-link(
            v-if="isMyProfile"
            :to="{ name: $routesNames.profileSettings }"
            class="btn action-btn btn-sm btn-outline-secondary"
        )
            i.ion-gear-a
            | Edit Profile Settings
        profile-follow-button(
            v-else
            :username="author.username"
            :following="author.following"
        )
    .container: .row: .col-xs-12.col-md-10.offset-md-1
        common-feed(
            :tabs="tabs"
            :active-tab-id="activeTabId"
            :is-loading="isLoading"
            :feed="activeFeed"
            :items-per-page="itemsPerPage"
            :current-page="currentPage"
            @page-changed="onPageChanged"
            @tab-changed="onTabChanged"
        )

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Route } from "vue-router"

import CommonFeed, { IFeedTab } from "@/components/CommonFeed.vue"
import CommonLoader from "@/components/CommonLoader.vue"
import ProfileFollowButton from "@/components/ProfileFollowButton.vue"
import IPagination, {
    DEFAULT_ITEMS_PER_PAGE,
    DEFAULT_START_PAGE,
} from "@/services/common/IPagination"
import { IArticleList, IProfile } from "@/services/realWorldApi/models"
import Article from "@/store/modules/Article"
import Profile from "@/store/modules/Profile"
import User from "@/store/modules/User"

enum FeedType {
    Favorites = "favorites",
    My = "my",
}

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"])

@Component({
    components: {
        CommonLoader,
        CommonFeed,
        ProfileFollowButton,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // @ts-ignore
            vm.onRouteUpdate(to, from, next)
        })
    },
    beforeRouteUpdate(to, from, next) {
        // @ts-ignore
        this.onRouteUpdate(to, from, next)
    },
})
export default class ProfileIndex extends Vue {
    _profile: IProfile = { username: "", bio: "", image: "", following: false }
    isLoading = false
    isFollowActionInProgress = false
    currentPage = DEFAULT_START_PAGE
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    activeTabId: FeedType = FeedType.My
    activeFeed: IArticleList = { articles: [], articlesCount: 0 }
    activeTag: string | null = null

    get profile(): IProfile {
        return Profile.profilesCache[this._profile?.username] || this._profile
    }

    get tabs(): IFeedTab[] {
        const myTitle = this.isMyProfile
            ? "My Articles"
            : `${this.profile.username}'s Articles`
        return [
            {
                id: FeedType.My,
                title: myTitle,
            },
            {
                id: FeedType.Favorites,
                title: "Favorited Articles",
            },
        ]
    }

    get isMyProfile(): boolean {
        return this.profile.username === User.currentUser?.username
    }

    async onRouteUpdate(
        to: Route,
        from: Route,
        next: () => void
    ): Promise<void> {
        next()

        this.isLoading = true
        try {
            const toUserName = to?.params?.username
            const fromUserName = from?.params?.username
            if (!toUserName) {
                this.$router.push({ name: this.$routesNames.home })
                return
            }
            if (toUserName !== fromUserName) {
                this._profile = await Profile.get(toUserName)
            }

            const tabId = to?.params?.tabId
            if (
                tabId &&
                Object.values(FeedType).some(v => (v as string) === tabId)
            ) {
                this.activeTabId = tabId as FeedType
            } else {
                this.activeTabId = FeedType.My
            }

            await this.fetchFeed()
        } catch (e) {
            this.$router.push({ name: this.$routesNames.home })
        } finally {
            this.isLoading = false
        }
    }

    async onTabChanged(tabId: FeedType): Promise<void> {
        switch (tabId) {
            case FeedType.My:
            case FeedType.Favorites:
                this.activeTabId = tabId
                this.currentPage = DEFAULT_START_PAGE
                this.$router.push({
                    params: {
                        username: this.profile.username,
                        tabId: this.activeTabId,
                    },
                })
                await this.fetchFeed()
                break

            default:
                throw new Error(`Unexpected tabId: ${tabId}`)
        }
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
                case FeedType.Favorites:
                    this.activeFeed = await Article.getList({
                        favorited: this.profile.username,
                        ...pagination,
                    })
                    break
                case FeedType.My:
                    this.activeFeed = await Article.getList({
                        author: this.profile.username,
                        ...pagination,
                    })
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