
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryEl = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loaderEl = document.querySelector(".loader");


const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

/**

  @param {Array} images
  */
 
export function createGallery(images = []) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(img => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="gallery-info">
          <p class="info-item"><b>Likes</b><br>${likes}</p>
          <p class="info-item"><b>Views</b><br>${views}</p>
          <p class="info-item"><b>Comments</b><br>${comments}</p>
          <p class="info-item"><b>Downloads</b><br>${downloads}</p>
        </div>
      </li>`;
    })
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);
 
  lightbox.refresh();
}


export function clearGallery() {
  galleryEl.innerHTML = "";
}


export function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove("hidden");
  loaderEl.setAttribute("aria-hidden", "false");
}


export function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add("hidden");
  loaderEl.setAttribute("aria-hidden", "true");
}


export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove("hidden");
}


export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add("hidden");
}
