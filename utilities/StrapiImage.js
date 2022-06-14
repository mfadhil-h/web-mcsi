export function strapiImage(baseUrl, imageResponse) {
    return baseUrl + imageResponse.data.attributes.url
}