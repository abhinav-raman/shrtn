export const BASE_URL =
	process.env.NODE_ENV !== "production"
		? "http://localhost:3000/"
		: "https://shrtn.vercel.app/";

export const API_SUCCESS = "success";
export const API_FAIL = "fail";
