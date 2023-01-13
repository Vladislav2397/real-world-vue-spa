<template lang="pug">

button(:class="classes" :disabled="isLoading" @click="toggleFavorites")
    i.ion-heart
    | &nbsp;
    template(
        v-if="isWithDescription"
    ) {{ favorited ? "Unfavorite Article" : "Favorite Article" }}
        span.counter ({{ favoritesCount }})
    template(
        v-else
    ) {{ favoritesCount }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

@Component
export default class ArticleFavoritesButton extends Vue {
    @Prop({ required: true }) favoritesCount!: number
    @Prop({ required: true }) favorited!: boolean
    @Prop({ required: true }) slug!: string
    @Prop({ default: false }) isWithDescription!: boolean

    isLoading = false

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get classes() {
        return [
            "btn btn-sm",
            this.favorited ? "btn-primary" : "btn-outline-primary",
        ]
    }

    async toggleFavorites(): Promise<void> {
        this.isLoading = true
        try {
            this.favorited
                ? await this.Article.removeFromFavorites(this.slug)
                : await this.Article.addToFavorites(this.slug)
        } finally {
            this.isLoading = false
        }
    }
}
</script>
