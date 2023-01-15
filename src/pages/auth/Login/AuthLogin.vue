<template lang="pug">

auth-page(
    :mode="mode"
)

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { Page, PageMode } from "../Page"

@Component({
    components: {
        "auth-page": Page,
    },
})
export default class AuthLogin extends Vue {
    mode: Readonly<PageMode> = PageMode.Login
}
</script>
