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
export default class AuthRegister extends Vue {
    mode: Readonly<PageMode> = PageMode.Register
}
</script>
