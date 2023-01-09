<template lang="pug">

div(
    v-if="isLoading"
)
    common-loader(
        :size="7"
    )
.sidebar(
    v-else
)
    p Popular Tags

    .tag-list
        a.tag-pill.tag-default(
            v-for="tag in tags"
            :key="tag"
            href="#"
            @click.prevent="tagSelectedEmit(tag)"
        ) {{ tag }}

</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator"

import { Loader } from "@/shared/ui"

import Tags from "@/store/modules/Tags"

@Component({
    components: {
        'common-loader': Loader
    },
})
export default class PopularTags extends Vue {
    tags: string[] = []
    isLoading = false

    async mounted() {
        await this.getTags()
    }

    async getTags() {
        this.isLoading = true

        try {
            this.tags = await Tags.get()
        } finally {
            this.isLoading = false
        }
    }

    @Emit("tag-selected")
    tagSelectedEmit(tag: string): string {
        return tag
    }
}
</script>
