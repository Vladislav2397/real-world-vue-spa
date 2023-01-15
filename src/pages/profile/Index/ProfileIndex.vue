<template lang="pug">

common-loader(
    v-if="isLoading || !profile"
)
.profile-page(
    v-else
)
    .user-info: .container: .row: .col-xs-12.col-md-10.offset-md-1
        img.user-img(
            :src="profile.image"
        )
        h4 {{ profile.username }}
        p {{ profile.bio }}

        router-link.btn.action-btn.btn-sm.btn-outline-secondary(
            v-if="isMyProfile"
            :to="{ name: $routesNames.profileSettings }"
        )
            i.ion-gear-a
            | &nbsp;Edit Profile Settings
        profile-follow-button(
            v-else=""
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
import { useModule } from "vuex-simple"

import { Loader } from "@/shared/ui"

import { ProfileFollowButton } from "@/features/ProfileFollowButton"

import { ArticleList } from "@/widgets/article"

import { DEFAULT_PER_PAGE, DEFAULT_START_PAGE } from "@/shared/config"
import { IArticleList, IProfile } from "@/services/realWorldApi/models"
import { userModel } from "@/entities/user"

enum FeedType {
    Favorites = "favorites",
    My = "my",
}

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"])

@Component({
    components: {
        "common-loader": Loader,
        "common-feed": ArticleList,
        "profile-follow-button": ProfileFollowButton,
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
    itemsPerPage = DEFAULT_PER_PAGE

    activeTabId: FeedType = FeedType.My
    activeFeed: IArticleList = { articles: [], articlesCount: 0 }
    activeTag: string | null = null

    User = userModel.useUserModule(this.$store)

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get Profile() {
        return useModule(this.$store, ["profile"]) as any
    }

    profile = null as unknown as IProfile

    get tabs(): FeedTab[] {
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
        return this.profile.username === this.User.currentUser?.username
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
                await this.$router.push({ name: this.$routesNames.home })
                return
            }
            if (toUserName !== fromUserName) {
                this._profile = await this.Profile.get(toUserName)
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

            console.log("fetch feed")
            await this.fetchFeed()
            console.log("end try")
        } catch (e) {
            this.$router.push({ name: this.$routesNames.home })
        } finally {
            this.isLoading = false
            console.log("finally")
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
            const pagination: Pagination = {
                limit: this.itemsPerPage,
                offset: (this.currentPage - 1) * this.itemsPerPage,
            }

            console.log(this.Profile, this._profile)

            this.profile = this.Profile.profilesCache[this._profile.username]

            console.log(
                "profile from cache",
                this.Profile.profilesCache[this._profile.username]
            )

            switch (this.activeTabId) {
                case FeedType.Favorites:
                    this.activeFeed = await this.Article.getList({
                        favorited: this.profile.username,
                        ...pagination,
                    })
                    break
                case FeedType.My:
                    this.activeFeed = await this.Article.getList({
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
