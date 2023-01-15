import { RouteConfig } from "vue-router"

import RoutesNames from "./routesNames"

export const Routes: RouteConfig[] = [
    {
        path: "/",
        name: RoutesNames.home,
        component: () =>
            import(/* webpackChunkName: "home" */ "@/pages/Home/Home.vue"),
    },
    {
        path: "/login",
        name: RoutesNames.authLogin,
        component: () =>
            import(
                /* webpackChunkName: "authLogin" */ "@/pages/auth/Login/AuthLogin.vue"
            ),
        meta: {
            anonymousOnly: true,
        },
    },
    {
        path: "/register",
        name: RoutesNames.authRegister,
        component: () =>
            import(
                /* webpackChunkName: "authRegister" */ "@/pages/auth/Register/AuthRegister.vue"
            ),
        meta: {
            anonymousOnly: true,
        },
    },
    {
        path: "/editor",
        name: RoutesNames.articleCreate,
        component: () =>
            import(
                /* webpackChunkName: "articleCreate" */ "@/pages/article/Create/ArticleCreate.vue"
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/editor/:slug",
        name: RoutesNames.articleEdit,
        component: () =>
            import(
                /* webpackChunkName: "articleEdit" */ "@/pages/article/Edit/ArticleEdit.vue"
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/article/:slug",
        name: RoutesNames.articleView,
        component: () =>
            import(
                /* webpackChunkName: "articleView" */ "@/pages/article/View/ArticleView.vue"
            ),
    },
    {
        path: "/@:username/:tabId?",
        name: RoutesNames.profileIndex,
        component: () =>
            import(
                /* webpackChunkName: "profileIndex" */ "@/pages/profile/Index/ProfileIndex.vue"
            ),
    },
    {
        path: "/settings",
        name: RoutesNames.profileSettings,
        component: () =>
            import(
                /* webpackChunkName: "profileSettings" */ "@/pages/profile/Settings/ProfileSettings.vue"
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "*",
        redirect: { name: RoutesNames.home },
    },
]
