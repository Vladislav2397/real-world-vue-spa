<template lang="pug">

div
    //github-corner
    the-header
    keep-alive
        router-view
    the-footer
    button(
        @click="isVisible = true"
    ) show modal
    modal-component(
        v-if="isVisible"
        @close="isVisible = false"
    )
    notifications(
        position="bottom right"
    )

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

// import { GithubCorner } from "@/shared/ui"
import { Modal } from "@/shared/ui/Modal"

import { TheHeader } from "@/widgets/Header"
import { TheFooter } from "@/widgets/Footer"

@Component({
    components: {
        "modal-component": Modal,
        "the-header": TheHeader,
        "the-footer": TheFooter,
        // "github-corner": GithubCorner,
    },
})
export default class App extends Vue {
    isVisible = false

    mounted() {
        this.isVisible = false
    }

    declare disablePageScroll: () => void
    declare enablePageScroll: () => void

    @Watch("isVisible", { immediate: true })
    onChangeVisible(value: boolean) {
        if (value) {
            this.disablePageScroll()
        } else {
            this.enablePageScroll()
        }
    }
}
</script>
