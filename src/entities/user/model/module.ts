import { Action, Getter, State, Mutation } from "vuex-simple"

import {
    IUser,
    IUserLoginRequestParams,
    IUserRegisterRequestParams,
    IUserUpdateRequestParams,
} from "@/services/realWorldApi/models"
import LocalStorageUtils from "@/utils/LocalStorageUtils"
import { ICurrentUser, IUserState } from "@/store/models"
import { TransformICurrentUserToIUser } from "@/store/transformers/IUserTransformers"

import userApi from "../api"
import lib from "@/shared/lib"
import { FetchArticleService } from "@/shared/model"

const AUTH_TOKEN_KEY = "realWorldAuthToken"

export class User implements IUserState {
    constructor() {
        FetchArticleService.registerSubscribe("fetchList", payload => {
            const users = payload.map((article: any) => article.author)
            this.updatePool(users)
        })
    }

    @State() pool = {}

    @Mutation()
    updatePool(users: any[]) {
        this.pool = {
            ...this.pool,
            ...Object.fromEntries(users.map(user => [user.username, user])),
        }
    }

    @State()
    private _currentUser: ICurrentUser | null = null

    @State()
    private _authToken: string | null =
        LocalStorageUtils.getItem(AUTH_TOKEN_KEY) ?? null

    @Getter()
    get currentUser(): ICurrentUser | null {
        return this._currentUser
    }

    @Getter()
    get authToken(): string {
        return this._authToken || ""
    }

    @Getter()
    get isLoggedIn(): boolean {
        return !!this._currentUser
    }

    @Mutation()
    private SET_CURRENT_USER(currentUser: ICurrentUser | null): void {
        this._currentUser = currentUser
    }

    @Mutation()
    private SET_AUTH_TOKEN(authToken?: string | null): void {
        if (authToken) {
            this._authToken = authToken
            LocalStorageUtils.setItem(AUTH_TOKEN_KEY, authToken)
        } else {
            this._authToken = null
            LocalStorageUtils.removeItem(AUTH_TOKEN_KEY)
        }
    }

    @Action()
    private setFromIUser(user: IUser): void {
        this.SET_CURRENT_USER(TransformICurrentUserToIUser(user))
        this.SET_AUTH_TOKEN(user.token)
    }

    @Action()
    async fetchCurrentUser(): Promise<void> {
        const res = (await userApi.getCurrent()) as IUser
        this.setFromIUser(res)
    }

    @Action()
    async login(params: IUserLoginRequestParams): Promise<void> {
        const res = (await userApi.login(params)) as IUser
        this.setFromIUser(res)
    }

    @Action()
    async register(params: IUserRegisterRequestParams): Promise<void> {
        const res = (await userApi.register(params)) as IUser
        this.setFromIUser(res)
    }

    @Action()
    async update(params: IUserUpdateRequestParams): Promise<void> {
        const res = (await userApi.update(params)) as IUser
        this.setFromIUser(res)
    }

    @Action()
    logout(): void {
        this.SET_AUTH_TOKEN(null)
        this.SET_CURRENT_USER(null)
    }

    @Action()
    async completeAuth(): Promise<void> {
        if (this.authToken && !this.isLoggedIn) {
            await this.fetchCurrentUser()
        }
    }
}

export const useUserModule = lib.store.useVuexModuleFactory<User>("user")
