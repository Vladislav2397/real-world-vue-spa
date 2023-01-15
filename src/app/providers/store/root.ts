import { Module } from "vuex-simple"

import { userModel } from "@/entities/user"
import { Profile } from "@/store/modules/Profile"

import { tagModel } from "@/entities/tag"
import { commentModel } from "@/entities/comment"

import { ArticleModule } from "@/features/article"

export class RootModule {
    @Module()
    tag = new tagModel.TagModule()

    @Module()
    comment = new commentModel.CommentModule()

    @Module()
    article = new ArticleModule(this)

    @Module()
    profile = new Profile()

    @Module()
    user = new userModel.UserModule()
}
