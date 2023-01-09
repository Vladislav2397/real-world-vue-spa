import { tagModel } from "@/entities/tag"
import { Module } from "vuex-simple"

export class RootModule {
    @Module()
    tag = new tagModel.TagModule()
}
