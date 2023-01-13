<template lang="pug">

div.article-meta
    router-link(
        :to="toProfile"
    )
        img(:src="authorImage")
    div.info
        router-link.author(
            :to="toProfile"
        ) {{ authorUsername }}
        span.date {{ articleDate }}
    slot

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import DateUtils from "@/utils/DateUtils"

@Component
export default class ArticleMeta extends Vue {
    @Prop({ required: true }) createdAt!: Date
    @Prop() authorImage!: string
    @Prop({ required: true }) authorUsername!: string

    get toProfile() {
        return {
            name: this.$routesNames.profileIndex,
            params: { username: this.authorUsername },
        }
    }

    get articleDate(): string {
        return DateUtils.yearMonthDayWeekdayFormat(this.createdAt)
    }
}
</script>
