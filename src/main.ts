import "./registerServiceWorker"

import Vue from "vue"
import Notifications from "vue-notification"
import VueInject from "vue-inject"

import App from "./app/App.vue"
import router, { RoutesNames } from "./app/providers/router"
import store from "./app/providers/store"

Vue.config.productionTip = false

Vue.prototype.$routesNames = RoutesNames

Vue.use(Notifications)
Vue.use(VueInject)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app")
