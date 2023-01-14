export type Viewer = {
    bio: string | null
    email: string
    image: string | null
    token: string
    username: UserName
}

type UpdateUser = {
    email: string
    bio: string
    image: string | null
    password: string | null
    username: UserName
}

type LoginCredential = {
    email: string
    password: string
}

type RegisterCredential = LoginCredential & {
    username: UserName
}

export type UserApi = {
    login: (params: LoginCredential) => Promise<Viewer>
    register: (params: RegisterCredential) => Promise<Viewer>
    getCurrent: () => Promise<Viewer>
    update: (params: UpdateUser) => Promise<Viewer>
}
