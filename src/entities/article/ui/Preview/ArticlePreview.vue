<template lang="pug">

.article-preview
    article-meta(
        :author-username="author.username"
        :created-at="article.createdAt"
        :author-image="author.image"
    )
        article-favorites-button(
            class="pull-xs-right"
            :favorited="article.favorited"
            :favorites-count="article.favoritesCount"
            :slug="article.slug"
        )
    router-link(
        :to="linkTo"
        href=""
        class="preview-link"
    )
        h1 {{ article.title }}
        p {{ article.description }}
        span Read more...

    .pull-xs-right
        span.tag-pill.tag-default.tag-outline(
            v-for="tag in visibleTags"
            :key="tag"
        ) {{ tag }}
        span(
            v-if="nonVisibleTagsNumber > 0"
        )
            | ... and {{ nonVisibleTagsNumber }} more.

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import ArticleFavoritesButton from "@/components/ArticleFavoritesButton.vue"
import ArticleMeta from "@/components/ArticleMeta.vue"
import { IArticle, IProfile } from "@/services/realWorldApi/models"
import Profile from "@/store/modules/Profile"

const MAX_VISIBLE_TAGS = 5

@Component({
    components: {
        ArticleMeta,
        ArticleFavoritesButton,
    },
})
export default class ArticlePreview extends Vue {
    @Prop({ required: true }) readonly article!: IArticle

    isLoading = false

    get linkTo() {
        return {
            name: this.$routesNames.articleView,
            params: { slug: this.article.slug },
        }
    }

    get visibleTags(): string[] {
        return this.article.tagList.slice(0, MAX_VISIBLE_TAGS)
    }

    get nonVisibleTagsNumber(): number {
        return this.article.tagList.length - MAX_VISIBLE_TAGS
    }
    get author(): IProfile {
        return (
            Profile.profilesCache[this.article.author.username] ||
            this.article.author
        )
    }
}
</script>
