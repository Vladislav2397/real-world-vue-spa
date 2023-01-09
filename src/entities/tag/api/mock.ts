import ApiStoreMock from "@/shared/api/mock"
import utils from "@/shared/lib/utils"

const getList = async () => {
    await utils.debug.delay(2000)

    return Object.values(ApiStoreMock.tags.pool).map(item => item.name)
}

const tagApiMock = {
    getList,
}

export default tagApiMock
