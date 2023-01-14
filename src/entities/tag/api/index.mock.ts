import ApiStoreMock from "@/shared/api/mock"
import utils from "@/shared/lib/utils"

const getList = async () => {
    await utils.debug.delay(2000)

    const tags = new Set()

    Object.values(ApiStoreMock.articles.pool).forEach(article => {
        article.tagList.forEach(tag => tags.add(tag))
    })

    return [...tags]
}

const tagApiMock = {
    getList,
}

export default tagApiMock
