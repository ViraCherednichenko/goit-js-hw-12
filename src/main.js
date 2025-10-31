
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("#search-form") || document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");
const galleryEl = document.querySelector(".gallery");


let currentQuery = "";
let currentPage = 1;
const PER_PAGE = 15; 

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);


async function onSearch(e) {
  e.preventDefault();
  const query = e.target.elements["query"].value.trim();

  if (!query) {
    iziToast.warning({ title: "Warning", message: "Please enter a search query!", position: "topRight" });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = Array.isArray(data.hits) ? data.hits : [];

    if (hits.length === 0) {
      iziToast.info({
        title: "No results",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(hits);

   
    if (data.totalHits > currentPage * PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    iziToast.success({
      title: "Found",
      message: `Found ${data.totalHits} images for "${currentQuery}"`,
      position: "topRight",
    });
  } catch (error) {
    iziToast.error({ title: "Error", message: "Something went wrong while fetching images.", position: "topRight" });
  } finally {
    hideLoader();
  }
}


async function onLoadMore() {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton(); 

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = Array.isArray(data.hits) ? data.hits : [];

    if (hits.length === 0) {
      iziToast.info({
        title: "No more",
        message: "No additional images found.",
        position: "topRight",
      });
      return;
    }

    createGallery(hits);

   
    const firstCard = galleryEl.firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }


    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: "Error", message: "Error loading more images!", position: "topRight" });
  } finally {
    hideLoader();
  }
}
