import store from "@/app/providers/store"
import { useModule } from "vuex-simple"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import router from "@/router"
import routesNames from "@/router/routesNames"
import HttpStatusCodes from "@/services/common/HttpStatusCodes"
// import User from "@/store/modules/User"
import { notifyErrors, notifyWarn } from "@/utils/NotificationUtils"

import { transformErrors } from "./Utils"

const AuthInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const User = useModule(store, ["user"]) as any

    const accessToken = User.authToken
    if (accessToken && config.headers)
        config.headers.Authorization = `Token ${accessToken}`
    return config
}

const OnResponseSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> =>
    response

const OnResponseFailure = (error: any): Promise<any> => {
    const httpStatus = error?.response?.status

    const User = useModule(store, ["user"]) as any

    const errors = transformErrors(error?.response?.data?.errors)
    const isUnknownError = errors?.[0].startsWith("Unknown")

    switch (httpStatus) {
        case HttpStatusCodes.UNAUTHORIZED:
            User.logout()
            router.push({ name: routesNames.authLogin })
            notifyWarn("You are not logged in, please login first.")
            break
        case HttpStatusCodes.NOT_FOUND:
            notifyErrors(
                errors?.length > 0 && !isUnknownError
                    ? errors
                    : ["Requested resource was not found."]
            )
            break
        case HttpStatusCodes.FORBIDDEN:
            notifyErrors(
                errors?.length > 0 && !isUnknownError
                    ? errors
                    : ["Access to this resource is forbidden"]
            )
            break
        case HttpStatusCodes.UNPROCESSABLE_ENTITY:
            // This case should be handled at the forms
            break
        default:
            notifyErrors(
                errors?.length > 0
                    ? errors
                    : ["Unknown error occurred, please try again later."]
            )
            break
    }
    return Promise.reject(errors)
}

const instance: Readonly<AxiosInstance> = axios.create({
    baseURL: "https://api.realworld.io/api",
    timeout: 5000,
})

instance.defaults.headers.get.Accepts = "application/json"
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

instance.interceptors.request.use(AuthInterceptor)

instance.interceptors.response.use(OnResponseSuccess, OnResponseFailure)

export default instance
