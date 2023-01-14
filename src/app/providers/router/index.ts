import Vue from "vue"
import store from "@/app/providers/store"
import VueRouter, { Route, NavigationGuardNext } from "vue-router"

import { Routes } from "./routes"
import RoutesNames from "./routesNames"
import { useModule } from "vuex-simple"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: Routes,
})

const requiresAuthGuard = (
    to: Route,
    from: Route,
    next: NavigationGuardNext
): boolean => {
    const User = useModule(store, ["user"]) as any

    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isLoggedIn = !!User.currentUser
        if (!isLoggedIn) {
            next({
                name: RoutesNames.authLogin,
                query: { redirect: to.fullPath },
            })
        } else {
            next()
        }
        return true
    }
    return false
}

const anonymousOnlyGuard = (
    to: Route,
    from: Route,
    next: NavigationGuardNext
): boolean => {
    const User = useModule(store, ["user"]) as any

    if (to.matched.some(record => record.meta.anonymousOnly)) {
        const isAnonymous = !User.currentUser
        if (!isAnonymous) {
            next({
                name: RoutesNames.home,
            })
        } else {
            next()
        }
        return true
    }
    return false
}

router.beforeEach(async (to, from, next) => {
    const User = useModule(store, ["user"]) as any

    await User.completeAuth()
    if (requiresAuthGuard(to, from, next)) {
        return
    }
    if (anonymousOnlyGuard(to, from, next)) {
        return
    }
    next() // make sure to always call next()!
})

export { RoutesNames }
export default router
