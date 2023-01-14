import ApiStoreMock from "@/shared/api/mock"
import utils from "@/shared/lib/utils"

import { UserApi, Viewer } from "./index.types"

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGRpc3p6NTNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2bGFkaXNsYXYiLCJpYXQiOjE2NzM2OTEwMjksImV4cCI6MTY3ODg3NTAyOX0.3mAgZM_DbYQ3fE1KOG1qaqK8cdiqZAZZInh8Tw2Gi-U"

const currentUser = () => {
    return ApiStoreMock.users.pool[ApiStoreMock.users.currentUser!]
}

const getViewer = (userData?: Partial<Viewer>): Viewer => {
    const user = currentUser()

    return {
        username: user.username,
        bio: user.bio,
        image: user.image,
        email: user.email,
        token,
    }
}

const userApiMock: UserApi = {
    async login({ email, password }) {
        if (email !== "valdiszz53@gmail.com" && password !== "11111111") {
            throw new Error("Incorrect login credential")
        }

        // Add filtered logic

        return getViewer()
    },
    async register({ username }) {
        return getViewer({ username })
    },
    async getCurrent() {
        return getViewer()
    },
    async update(params) {
        return getViewer({
            ...utils.object.omit(params, ["password"]),
        })
    },
}

export default userApiMock
