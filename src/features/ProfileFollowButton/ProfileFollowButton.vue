<template lang="pug">

button(
    :class="classes"
    :disabled="isLoading"
    @click="onFollowButtonClick"
)
    i(
        :class="[following ? 'ion-minus-round' : 'ion-plus-round']"
    )
    | {{ followButtonTitle }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

@Component
export default class ProfileFollowButton extends Vue {
    @Prop({ required: true }) following!: boolean
    @Prop({ required: true }) username!: string

    isLoading = false

    get classes() {
        return [
            "btn btn-sm action-btn",
            this.following ? "btn-secondary" : "btn-outline-secondary",
        ]
    }

    get Profile() {
        return useModule(this.$store, ["profile"]) as any
    }

    get followButtonTitle(): string {
        return this.following
            ? `Unfollow ${this.username}`
            : `Follow ${this.username}`
    }
    async onFollowButtonClick(): Promise<void> {
        this.isLoading = true
        try {
            this.following
                ? await this.Profile.unFollow(this.username)
                : await this.Profile.follow(this.username)
        } finally {
            this.isLoading = false
        }
    }
}
</script>
