<template lang="pug">

.modal
    .modal__wrapper(
        ref="wrapper"
        data-scroll-lock-scrollable
    )
        .modal__scroll(
            ref="scroller"
        )
            h1 Title for modal
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
            p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto aut commodi deleniti dolores eius et facilis, itaque laboriosam maiores nisi obcaecati officia optio quam quibusdam quis reiciendis saepe!
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue } from "vue-property-decorator"
import { setGesture, setup } from "./gesture"

@Component
export default class Modal extends Vue {
    @Ref("wrapper") wrapperRef!: HTMLElement
    @Ref("scroller") scrollerRef!: HTMLElement

    @Emit("close") closeEmit() {
        return
    }

    mounted() {
        setGesture(this.wrapperRef, this.scrollerRef)
        setup({
            closeDuration: 200,
            closableOffset: 200,
            onClose: this.onClose,
        })
    }

    onClose() {
        this.closeEmit()
    }
}
</script>

<style lang="scss" src="./Modal.critical.scss" />
<style lang="scss" src="./Modal.main.scss" />
