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
            :to="linkTo"
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

import { Meta } from "../Meta"

// feature
import ArticleFavoritesButton from "@/components/ArticleFavoritesButton.vue"
// feature
import ProfileFollowButton from "@/components/ProfileFollowButton.vue"

import { IArticle, IProfile } from "@/services/realWorldApi/models"
import { userModel } from "@/entities/user"

@Component({
    components: {
        "article-meta": Meta,
        ArticleFavoritesButton,
        ProfileFollowButton,
    },
})
export default class ArticleViewHeader extends Vue {
    @Prop({ required: true }) article!: IArticle

    get linkTo() {
        return {
            name: this.$routesNames.articleEdit,
            params: { slug: this.article.slug },
        }
    }

    get User() {
        return useModule(this.$store, ["user"]) as typeof userModel.UserModule
    }

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
