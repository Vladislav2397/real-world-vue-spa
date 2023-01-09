<template lang="pug">

nav.navbar.navbar-light
    .container
        router-link(:to="{ name: $routesNames.home }" class="navbar-brand") conduit
        ul(class="nav navbar-nav pull-xs-right")
            li(
                v-for="menuItem in menuItems"
                :key="menuItem.title"
                class="nav-item"
            )
                router-link(
                    :to="{ name: menuItem.routeName }"
                    :exact-active-class="`active`"
                    class="nav-link"
                )
                    i(v-if="menuItem.icon" :class="menuItem.icon")
                    | &nbsp;{{ menuItem.title }}
            template(v-if="isLoggedIn")
                li.nav-item
                    router-link(
                        class="nav-link"
                        :exact-active-class="`active`"
                        :to="linkTo"
                    )
                        img(
                            v-if="userImage"
                            :src="userImage"
                            class="user-pic"
                        )
                        | {{ userName }}

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"

// import User from "@/store/modules/User"

interface IMenuItem {
    title: string
    icon?: string
    routeName: string
    isShow: boolean
}

@Component
export default class TheHeader extends Vue {
    get linkTo() {
        return {
            name: this.$routesNames.profileIndex,
            params: { username: this.userName },
        }
    }

    get User() {
        return useModule(this.$store, ['user']) as any
    }

    get menuItems(): IMenuItem[] {

        const menuItems = [
            {
                title: "Home",
                routeName: this.$routesNames.home,
                isShow: true,
            },
            {
                title: "New Article",
                icon: "ion-compose",
                routeName: this.$routesNames.articleCreate,
                isShow: this.isLoggedIn,
            },
            {
                title: "Settings",
                routeName: this.$routesNames.profileSettings,
                icon: "ion-gear-a",
                isShow: this.isLoggedIn,
            },
            {
                title: "Sign up",
                routeName: this.$routesNames.authRegister,
                isShow: !this.isLoggedIn,
            },
            {
                title: "Sign in",
                routeName: this.$routesNames.authLogin,
                isShow: !this.isLoggedIn,
            },
        ]
        return menuItems.filter(menuItem => menuItem.isShow)
    }

    get isLoggedIn(): boolean {
        return this.User.isLoggedIn
    }

    get userName(): string {
        return this.User.currentUser?.username || ""
    }

    get userImage(): string | null | undefined {
        return this.User.currentUser?.image
    }
}
</script>
