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
        span(class="date-posted") {{ commentDate }}
        span(class="mod-options")
            i(
                class="ion-trash-a"
                :disabled="isLoading"
                @click="deleteComment"
            )

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import { IComment } from "@/services/realWorldApi/models"
import Article from "@/store/modules/Article"
import User from "@/store/modules/User"
import DateUtils from "@/utils/DateUtils"

@Component
export default class CommentDisplay extends Vue {
    @Prop({ required: true }) comment!: IComment
    @Prop({ required: true }) slug!: string

    isLoading = false

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
        return User.currentUser?.username === this.comment.author.username
    }

    async deleteComment(): Promise<void> {
        this.isLoading = true
        try {
            await Article.deleteComment({
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
