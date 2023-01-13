import { Module } from "vuex-simple"

import { User } from "@/store/modules/User"
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
    article = new ArticleModule()

    @Module()
    profile = new Profile()

    @Module()
    user = new User()
}
