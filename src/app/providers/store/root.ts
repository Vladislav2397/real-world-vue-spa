import { User } from "@/store/modules/User"
import { Profile } from "@/store/modules/Profile"
import { Article } from "@/store/modules/Article"
// import { articleModel } from "@/entities/article"
import { tagModel } from "@/entities/tag"
import { Module } from "vuex-simple"

export class RootModule {
    @Module()
    tag = new tagModel.TagModule()

    @Module()
    article = new Article()

    @Module()
    profile = new Profile()

    @Module()
    user = new User()
}
