const getList = async (): Promise<string[]> => {
  return ['some', 'tags']
}

const tagsMock = {
    getList,
}

export default tagsMock
