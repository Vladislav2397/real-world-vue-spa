<template lang="pug">

footer
    .container
        a(href="/" class="logo-font") conduit
        span.attribution
            | An interactive learning project from
            a(href="https://thinkster.io") Thinkster
            | . Code &amp; design licensed under MIT.

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class TheFooter extends Vue {}
</script>
