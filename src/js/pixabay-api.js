
import axios from "axios";


const PIXABAY_KEY = "52890208-7e9e33748fa955c38ee9e6aa5";
const PER_PAGE = 15;

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  timeout: 10000,
  params: {
    key: PIXABAY_KEY,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: PER_PAGE,
  },
});



/**
 * @param {string} query 
 * @param {number} page 
 * @returns {Promise<Object>} 
 */
 
export async function getImagesByQuery(query, page = 1) {
  if (!query || typeof query !== "string") {
    return Promise.reject(new Error("Query must be a non-empty string"));
  }

  try {
    const response = await api.get("/", {
      params: {
        q: query.trim(),
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
