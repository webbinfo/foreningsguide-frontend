export function getStrapiURL(path = "") {
    return `${process.env.STRAPI_API_URL || 'http://68.183.241.6'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    
    //Return full URL if image is hosted on external server
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString('sv-SE');
}