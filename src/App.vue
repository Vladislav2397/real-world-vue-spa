<template>
    <div>
        <github-corner />
        <the-header />
        <keep-alive>
            <router-view />
        </keep-alive>
        <the-footer />
        <notifications position="bottom right" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import GithubCorner from "@/components/GithubCorner.vue"
import { TheHeader } from "@/widgets/Header"
import { TheFooter } from "@/widgets/Footer"

@Component({
    components: {
        'the-header': TheHeader,
        'the-footer': TheFooter,
        GithubCorner,
    },
})
export default class App extends Vue {}
</script>
