export const API_SUCCESS = "success";
export const API_FAIL = "fail";
export const BASE_URL = {
    DEV: "http://localhost:3000",
    PROD: "https://shrtn.abhinavraman.in",
};
export type ShortLinkType = {
    slug: string;
    userLink: string;
    email: string;
    createdAt: string;
};
