
// [origin]/tags
const getTags = async (): Promise<string[]> => {
  return ['some', 'tags']
}

const tagsMock = {
    getTags,
}

export default tagsMock
