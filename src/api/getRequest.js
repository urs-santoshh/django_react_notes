const getRequest = async (url)=> {
    const response = await fetch(url)
    return response
}
export default getRequest