import { Mutation, State } from "vuex-simple"

export class CommentModule {
    @State() pool = {}
    @State() active: number[] = []

    @Mutation()
    updatePool(pool: any) {
        this.pool = {
            ...this.pool,
            ...pool,
        }
    }

    @Mutation()
    updateActive(active: any) {
        this.active = active
    }
}
