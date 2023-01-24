<template lang="pug">

create-article-form

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { CreateArticleForm } from "@/features/article"

@Component({
    components: {
        "create-article-form": CreateArticleForm,
    },
})
export default class ArticleCreate extends Vue {}
</script>
