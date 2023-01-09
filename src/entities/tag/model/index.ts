// import { TagsGet } from "@/services/realWorldApi/RealWorldApiTags"
import tagApi from "../api"
import { Action } from "vuex-simple"

export class TagModule {
    @Action()
    getTags() {
        return tagApi.getList()
    }
}
