export function strapiImage(baseUrl, imageResponse) {
    if (baseUrl == "/")
        return imageResponse.data.attributes.url
    return baseUrl + imageResponse.data.attributes.url
}