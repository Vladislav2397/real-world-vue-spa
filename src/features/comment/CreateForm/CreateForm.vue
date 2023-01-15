<template lang="pug">

div(v-if="!isLoggedIn")
    router-link(
        :to="{ name: $routesNames.authLogin }"
    ) Sign in
    | or
    router-link(
        :to="{ name: $routesNames.authRegister }"
    ) sign up
    | to add comments on this article.
div(
    v-else
)
    common-errors-list(
        :errors="errors"
    )
    form(
        class="card comment-form"
    )
        .card-block
            textarea(
                v-model="body"
                :disabled="isLoading"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
            )
        .card-footer
            img(
                :src="userImage"
                class="comment-author-img"
            )
            button(
                class="btn btn-sm btn-primary"
                :disabled="isLoading"
                @click.prevent="addComment"
            ) Post Comment

</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

import { ErrorList } from "@/shared/ui"
import { isArrayOfStrings } from "@/utils/ArrayUtils"
import { notifySuccess } from "@/utils/NotificationUtils"

@Component({
    components: {
        "common-errors-list": ErrorList,
    },
})
export default class CommentCreate extends Vue {
    @Prop({ required: true }) slug!: string

    @Emit("comment-added") commentAddedEmit() {
        return
    }

    body = ""
    errors: string[] = []
    isLoading = false

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get User() {
        return useModule(this.$store, ["user"]) as any
    }

    get userImage(): string | null | undefined {
        return this.User.currentUser?.image
    }

    get isLoggedIn(): boolean {
        return this.User.isLoggedIn
    }

    async addComment(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            await this.Article.addComment({
                slug: this.slug,
                params: { body: this.body },
            })
            this.commentAddedEmit()
            this.body = ""
            notifySuccess("Comment is added successfully")
        } catch (e) {
            if (isArrayOfStrings(e)) {
                this.errors = e as string[]
            } else {
                throw e
            }
        } finally {
            this.isLoading = false
        }
    }
}
</script>
