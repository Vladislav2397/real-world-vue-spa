// [origin]/user
const getUser = async () => {
    return {
        bio: null,
        email: "valdiszz53@gmail.com",
        image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGRpc3p6NTNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2bGFkaXNsYXYiLCJpYXQiOjE2NzMxOTQyNTUsImV4cCI6MTY3ODM3ODI1NX0.Od-kjgbm66nTrkPiD5gqmYrCP6W1KuLxn1pEogVM4Wg",
        username: "vladislav",
    }
}

const updateUser = async (data: any) => {
    return data
}

const userMock = {
    getUser,
    updateUser,
}

export default userMock
