import { Action, Getter, State, Mutation } from "vuex-simple"

import {
    IUser,
    IUserLoginRequestParams,
    IUserRegisterRequestParams,
    IUserUpdateRequestParams,
} from "@/services/realWorldApi/models"
import {
    UserGetCurrent,
    UserLogin,
    UserRegister,
    UserUpdate,
} from "@/services/realWorldApi/RealWorldApiUser"
import LocalStorageUtils from "@/utils/LocalStorageUtils"

import { ICurrentUser, IUserState } from "../models"
import { TransformICurrentUserToIUser } from "../transformers/IUserTransformers"

const AUTH_TOKEN_KEY = "realWorldAuthToken"

export class User implements IUserState {
    @State()
    private _currentUser?: ICurrentUser | null = null

    @State()
    private _authToken?: string = LocalStorageUtils.getItem(AUTH_TOKEN_KEY)

    @Getter()
    get currentUser(): ICurrentUser | undefined | null {
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
    private SET_CURRENT_USER(currentUser?: ICurrentUser): void {
        this._currentUser = currentUser
    }

    @Mutation()
    private SET_AUTH_TOKEN(authToken?: string): void {
        if (authToken) {
            this._authToken = authToken
            LocalStorageUtils.setItem(AUTH_TOKEN_KEY, authToken)
        } else {
            this._authToken = undefined
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
        const res = await UserGetCurrent()
        this.setFromIUser(res)
    }

    @Action()
    async login(params: IUserLoginRequestParams): Promise<void> {
        const res = await UserLogin(params)
        this.setFromIUser(res)
    }

    @Action()
    async register(params: IUserRegisterRequestParams): Promise<void> {
        const res = await UserRegister(params)
        this.setFromIUser(res)
    }

    @Action()
    async update(params: IUserUpdateRequestParams): Promise<void> {
        const res = await UserUpdate(params)
        this.setFromIUser(res)
    }

    @Action()
    logout(): void {
        this.SET_AUTH_TOKEN(undefined)
        this.SET_CURRENT_USER(undefined)
    }

    @Action()
    async completeAuth(): Promise<void> {
        if (this.authToken && !this.isLoggedIn) {
            await this.fetchCurrentUser()
        }
    }
}
