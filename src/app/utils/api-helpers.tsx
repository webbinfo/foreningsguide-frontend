export function getStrapiURL(path = "") {
    return `${process.env.STRAPI_API_URL || 'https://cms.foreningsguide.studentlivet.se'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    //Return full URL if image is hosted on external server
    if (url.startsWith("https") || url.startsWith("//")) {
        return url;
    }

    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString('sv-SE');
}