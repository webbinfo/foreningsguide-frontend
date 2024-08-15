import { getStrapiURL } from "./api-helpers";
import qs from "qs";

export async function fetchAPI(
    path: string,
    urlParamsObject = {},
    options = {},
) {
    try {
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                "Conent-Type": "application/json",
            },
            ...options,
        };

        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching the data.");
    }
}