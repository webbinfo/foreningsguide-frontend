import { fetchAPI } from "./fetch-api";

export async function getPageBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = "/pages";
    const urlParamsObject = {filters: {slug}, populate: ["content", "content.image", "content.buttons"]};
    const auth = {headers: {Authorization: `Bearer ${token}`}};

    return await fetchAPI(path, urlParamsObject, auth);
}