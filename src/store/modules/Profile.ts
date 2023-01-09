import Vue from "vue"
import {
    Action,
    // Module,
    Mutation,
    // VuexModule,
} from "vuex-simple"

import { IProfile } from "@/services/realWorldApi/models"
import {
    ProfileFollow,
    ProfileGet,
    ProfileUnfollow,
} from "@/services/realWorldApi/RealWorldApiProfile"

export class Profile {
    private _profilesCache: Record<string, IProfile> = {}

    get profilesCache(): Record<string, IProfile> {
        return this._profilesCache
    }

    @Mutation()
    addProfileToCache(profile: IProfile): void {
        Vue.set(this._profilesCache, profile.username, profile)
    }

    @Action()
    async get(username: string): Promise<IProfile> {
        const res = await ProfileGet(username)
        this.addProfileToCache(res)
        return res
    }

    @Action()
    async follow(username: string): Promise<IProfile> {
        const res = await ProfileFollow(username)
        this.addProfileToCache(res)
        return res
    }

    @Action()
    async unFollow(username: string): Promise<IProfile> {
        const res = await ProfileUnfollow(username)
        this.addProfileToCache(res)
        return res
    }
}

// export default getModule(Profile)
