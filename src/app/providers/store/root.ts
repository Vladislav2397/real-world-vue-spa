import { User } from "@/store/modules/User"
import { Profile } from "@/store/modules/Profile"
import { ArticleModule } from "@/features/article"
import { tagModel } from "@/entities/tag"
import { Module } from "vuex-simple"

export class RootModule {
    @Module()
    tag = new tagModel.TagModule()

    @Module()
    article = new ArticleModule()

    @Module()
    profile = new Profile()

    @Module()
    user = new User()
}
