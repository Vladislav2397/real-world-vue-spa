import other from "./other"

describe("getPaginationList", () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    it("should return started elements", () => {
        const enter: Pagination = {
            limit: 10,
            offset: 0,
        }
        const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        expect(other.getPaginatedList(list, enter)).toStrictEqual(result)
    })

    it("should return second page elements", () => {
        const enter: Pagination = {
            limit: 10,
            offset: 10,
        }
        const result = [11, 12, 13]

        expect(other.getPaginatedList(list, enter)).toStrictEqual(result)
    })
    it("should return third page elements (empty page)", () => {
        const enter: Pagination = {
            limit: 10,
            offset: 20,
        }
        const result: number[] = []

        expect(other.getPaginatedList(list, enter)).toStrictEqual(result)
    })
})
