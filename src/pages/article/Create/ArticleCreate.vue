<template lang="pug">

article-editor

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { ArticleForm } from "@/features/article"

@Component({
    components: {
        "article-editor": ArticleForm,
    },
})
export default class ArticleCreate extends Vue {}
</script>
