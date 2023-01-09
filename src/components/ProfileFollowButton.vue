<template>
    <button :class="[
        'btn btn-sm action-btn',
        following ? 'btn-secondary' : 'btn-outline-secondary',
    ]" :disabled="isLoading" @click="onFollowButtonClick">
        <i :class="[following ? 'ion-minus-round' : 'ion-plus-round']"></i>
        {{ followButtonTitle }}
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

// import Profile from "@/store/modules/Profile"

@Component
export default class ProfileFollowButton extends Vue {
    @Prop({ required: true }) following!: boolean
    @Prop({ required: true }) username!: string

    isLoading = false

    get Profile() {
        return useModule(this.$store, ['profile']) as any
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
