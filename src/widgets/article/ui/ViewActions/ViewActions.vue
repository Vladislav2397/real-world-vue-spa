<template lang="pug">

article-meta(
    :author-username="author.username"
    :created-at="article.createdAt"
    :author-image="author.image"
)
    template(
        v-if="!isMyArticle"
    )
        profile-follow-button(
            :username="author.username"
            :following="author.following"
        )
        | &nbsp;&nbsp;
        article-favorites-button(
            :favorited="article.favorited"
            :favorites-count="article.favoritesCount"
            :slug="article.slug"
            :is-with-description="true"
        )
    template(
        v-else
    )
        router-link.btn.btn-outline-secondary.btn-sm(
            :to="toArticleEdit"
        )
            i.ion-edit
            | Edit Article
        | &nbsp;&nbsp;
        button.btn.btn-outline-danger.btn-sm(
            @click="deleteArticle"
        )
            i.ion-trash-a
            | Delete Article

</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

import { userModel } from "@/entities/user"
import { ArticleMeta } from "@/entities/article"

import { ArticleFavoritesButton } from "@/features/article"
import { ProfileFollowButton } from "@/features/ProfileFollowButton"

import { IArticle, IProfile } from "@/services/realWorldApi/models"

@Component({
    components: {
        "article-meta": ArticleMeta,
        "article-favorites-button": ArticleFavoritesButton,
        "profile-follow-button": ProfileFollowButton,
    },
})
export default class ArticleViewHeader extends Vue {
    @Prop({ required: true }) article!: IArticle

    get toArticleEdit() {
        return {
            name: this.$routesNames.articleEdit,
            params: { slug: this.article.slug },
        }
    }

    User = userModel.useUserModule(this.$store)

    get Profile() {
        return useModule(this.$store, ["profile"]) as any
    }

    get author(): IProfile {
        return (
            this.Profile.profilesCache[this.article.author.username] ||
            this.article.author
        )
    }

    get isMyArticle(): boolean {
        return this.article.author.username === this.User.currentUser?.username
    }

    @Emit("delete-article")
    deleteArticle(): void {
        return
    }
}
</script>
