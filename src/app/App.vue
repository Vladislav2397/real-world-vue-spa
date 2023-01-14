<template lang="pug">

div
    github-corner
    the-header
    keep-alive
        router-view
    the-footer
    notifications(
        position="bottom right"
    )

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { GithubCorner } from "@/shared/ui"

import { TheHeader } from "@/widgets/Header"
import { TheFooter } from "@/widgets/Footer"

@Component({
    components: {
        "the-header": TheHeader,
        "the-footer": TheFooter,
        "github-corner": GithubCorner,
    },
})
export default class App extends Vue {}
</script>
