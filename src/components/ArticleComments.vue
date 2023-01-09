<template>
    <div>
        <common-loader v-if="isLoading" />
        <template v-else>
            <comment-add :slug="slug" @comment-added="refreshComments" />
            <comment-display v-for="comment in comments" :key="comment.id" :comment="comment" :slug="slug"
                @comment-deleted="refreshComments" />
        </template>
    </div>
</template>

<script lang="ts">
// @/widgets/comment/ui

import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import { CommentCreate, CommentCard } from "@/entities/comment"
import CommonLoader from "@/components/CommonLoader.vue"
import { IComment } from "@/services/realWorldApi/models"
import { useModule } from "vuex-simple"
// import Article from "@/store/modules/Article"

@Component({
    components: {
        CommonLoader,
        'comment-add': CommentCreate,
        'comment-display': CommentCard
    }
})
export default class ArticleComments extends Vue {
    @Prop({ required: true }) slug!: string

    comments: IComment[] = []
    isLoading = false

    get Article() {
        return useModule(this.$store, ['article']) as any
    }

    refreshComments(): void {
        const comments: IComment[] = []
        Object.values(this.Article.commentsCache[this.slug] || [])?.forEach(
            comment => {
                // @ts-ignore
                if (this.Article.commentsCache[this.slug]?.[comment.id]) {
                    // @ts-ignore
                    comments.push(this.Article.commentsCache[this.slug][comment.id])
                }
            }
        )
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
