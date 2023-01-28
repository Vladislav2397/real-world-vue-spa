<template lang="pug">

.modal
    transition(
        name="fade"
        duration="300"
    )
        .modal__overlay(
            v-if="isVisible"
            @click.stop="onClickOverlay"
        )
    .modal__wrapper(
        ref="wrapper"
        @click.prevent.stop
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
import { GestureMove } from "./gesture"

@Component
export default class Modal extends Vue {
    @Ref("wrapper") wrapperRef!: HTMLElement
    @Ref("scroller") scrollerRef!: HTMLElement

    @Emit("close") closeEmit() {
        return
    }

    onClickOverlay() {
        this.gestureMove?.close()
    }

    gestureMove: GestureMove | null = null

    mounted() {
        this.gestureMove = new GestureMove(this.wrapperRef, this.scrollerRef, {
            closeDuration: 300,
            closableOffset: 200,
            onAfterClose: this.onAfterClose,
            onClose: this.onClose,
        })
    }

    isVisible = true

    onAfterClose() {
        this.isVisible = false
    }

    onClose() {
        this.closeEmit()
    }
}
</script>

<style lang="scss" src="./Modal.critical.scss" />
<style lang="scss" src="./Modal.main.scss" />
