function getPaginatedList<T>(
    list: T[],
    { limit = 10, offset = 0 }: Pagination
) {
    return list.slice(offset, limit + offset)
}

const other = {
    getPaginatedList,
}

export default other
