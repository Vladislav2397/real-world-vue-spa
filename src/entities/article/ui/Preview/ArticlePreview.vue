<template lang="pug">

.article-preview
    article-meta(
        :author-username="author.username"
        :created-at="article.createdAt"
        :author-image="author.image"
    )
        slot(
            name="actions"
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
import { useModule } from "vuex-simple"

import { Article } from "../../types"
import { Meta } from "../Meta"

import type { User } from "@/entities/user"

const MAX_VISIBLE_TAGS = 5

@Component({
    components: {
        "article-meta": Meta,
    },
})
export default class ArticlePreview extends Vue {
    @Prop({ required: true }) readonly article!: Article

    isLoading = false

    get Profile() {
        return useModule(this.$store, ["profile"]) as any
    }

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
    get author(): User {
        return (
            this.Profile.profilesCache[this.article.author.username] ||
            this.article.author
        )
    }
}
</script>
