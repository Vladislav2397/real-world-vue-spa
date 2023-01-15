import { useModule } from "vuex-simple"
import { Store } from "vuex"

export const useVuexModuleFactory =
    <T extends object>(namespace: string) =>
    (store: Store<any>) =>
        useModule(store, [namespace]) as T
