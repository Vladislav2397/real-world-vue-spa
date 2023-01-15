<template lang="pug">

.card
    .card-block
        p.card-text {{ comment.body }}
    .card-footer
        a(href="" class="comment-author")
            img(:src="comment.author.image" class="comment-author-img")
        | &nbsp;
        router-link(
            :to="linkTo"
            class="comment-author"
        ) {{ comment.author.username }}
        span.date-posted {{ commentDate }}
        span.mod-options
            i.ion-trash-a(
                :disabled="isLoading"
                @click="deleteComment"
            )

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

import { IComment } from "@/services/realWorldApi/models"

import DateUtils from "@/utils/DateUtils"

@Component
export default class CommentDisplay extends Vue {
    @Prop({ required: true }) comment!: IComment
    @Prop({ required: true }) slug!: string

    isLoading = false

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get User() {
        return useModule(this.$store, ["user"]) as any
    }

    get linkTo() {
        return {
            name: this.$routesNames.profileIndex,
            params: { username: this.comment.author.username },
        }
    }

    get commentDate(): string {
        return DateUtils.yearMonthDayWeekdayFormat(this.comment.createdAt)
    }

    get isMyComment(): boolean {
        return this.User.currentUser?.username === this.comment.author.username
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
