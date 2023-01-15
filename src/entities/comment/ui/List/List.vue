<template lang="pug">

common-loader(
    v-if="isLoading"
)
div(
    v-else
)
    comment-add(
        :slug="slug"
        @comment-added="refreshComments"
    )
    comment-display(
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :slug="slug"

        @comment-deleted="refreshComments"
    )

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { useModule } from "vuex-simple"

import { Loader } from "@/shared/ui"

import { Card as CommentCard } from "../Card"
import { Create as CommentCreate } from "../Create"
import { Comment } from "../../types"

@Component({
    components: {
        "common-loader": Loader,
        "comment-add": CommentCreate,
        "comment-display": CommentCard,
    },
})
export default class ArticleComments extends Vue {
    @Prop({ required: true }) slug!: string

    comments: Comment[] = []
    isLoading = false

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    refreshComments(): void {
        const comments: Comment[] = []

        Object.values<Comment>(
            this.Article.commentsCache[this.slug] || []
        )?.forEach(comment => {
            if (this.Article.commentsCache[this.slug]?.[comment.id]) {
                comments.push(this.Article.commentsCache[this.slug][comment.id])
            }
        })
        comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        this.comments = comments
    }

    @Watch("slug", { immediate: true })
    async onSlugChange(slug: string): Promise<void> {
        this.isLoading = true
        try {
            if (slug) {
                await this.Article.fetchComments(slug)
                this.refreshComments()
            }
        } finally {
            this.isLoading = false
        }
    }
}
</script>
