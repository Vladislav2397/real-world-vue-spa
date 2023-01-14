export interface IRoutesNames {
    home: string

    authLogin: string
    authRegister: string

    articleCreate: string
    articleEdit: string
    articleView: string

    profileIndex: string
    profileSettings: string
}

const routesNames: Readonly<IRoutesNames> = {
    home: "home",

    authLogin: "authLogin",
    authRegister: "authRegister",

    articleCreate: "articleCreate",
    articleEdit: "articleEdit",
    articleView: "articleView",

    profileIndex: "profileIndex",
    profileSettings: "profileSettings",
}

declare module "vue/types/vue" {
    interface Vue {
        $routesNames: IRoutesNames
    }
}

export default routesNames
