<template lang="pug">

.sidebar
    p Popular Tags

    div(
        v-if="isLoading"
    )
        loader-component(
            :size="7"
        )
    .tag-list(
        v-else
    )
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
import { useModule } from "vuex-simple"

@Component({
    components: {
        'loader-component': Loader
    },
})
export default class PopularTags extends Vue {
    tags: string[] = []
    isLoading = false

    get Tags() {
        // TODO: Move interface module to shared slice
        return useModule(this.$store, ['tag']) as {
            getTags(): Promise<string[]>
        }
    }

    async mounted() {
        await this.getTags()
    }

    async getTags() {
        this.isLoading = true

        try {
            this.tags = await this.Tags.getTags()
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
