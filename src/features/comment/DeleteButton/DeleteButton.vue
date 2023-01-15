<template lang="pug">
i.ion-trash-a(
    :disabled="isLoading"
    @click="deleteComment"
)
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

@Component
export default class DeleteButton extends Vue {
    @Prop() readonly slug!: ArticleSlug
    @Prop() readonly comment!: { id: number }

    isLoading = false

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    async deleteComment(): Promise<void> {
        this.isLoading = true
        try {
            await this.Article.deleteComment({
                slug: this.slug,
                commentId: this.comment.id,
            })
            this.$emit("comment-deleted")
        } finally {
            this.isLoading = false
        }
    }
}
</script>
