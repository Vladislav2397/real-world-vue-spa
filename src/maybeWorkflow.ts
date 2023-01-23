// // @/shared/api
// const api = {
//     fetchPosts() {
//         const articles: any[] = []
//         const comments: any[] = []
//         const authors: any[] = []
//
//         return {
//             articles,
//             comments,
//             authors,
//         }
//     },
// }
// // @ts-ignore
// api.fetchPosts.subscribe = (handler: (payload: any) => void) => {
//     /**/
// }
// // ===================
//
// // @/entities/article/actions
// const fetchPostList = ({
//     commit,
// }: {
//     commit: (type: string, payload: any) => void
// }) => {
//     const { articles } = api.fetchPosts()
//
//     commit("update", articles)
// }
// // ===================
//
// const store = {
//     dispatch(type: string, payload?: any) {
//         /**/
//     },
// }
//
// // @/entities/comment
// api.fetchPosts.subscribe(payload => store.dispatch("comment/onFetch", payload))
// // ===================
//
// // @/entities/user
// api.fetchPosts.subscribe(payload => store.dispatch("user/onFetch", payload))
// // ===================
