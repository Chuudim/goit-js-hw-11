
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";


window.onload = function () {
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const apiKey = '34895414-9ef57564a22c698a0997c3c6f';
 searchInput

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const searchTerm = searchInput.value;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderImages(data.hits);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
});

function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  const cardsMarkup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" class="gallery__image" />
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views:</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${downloads}
          </p>
        </div>
      </div>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', cardsMarkup);

  
  const galleryImages = document.querySelectorAll('.gallery__image');
  galleryImages.forEach(image => {
    image.addEventListener('click', () => {
      new SimpleLightbox(`<img src="${image.dataset.src}">`).show();
    });
  });
}

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  gallery.innerHTML = '';

  fetchImages(searchQuery);

  event.currentTarget.reset();
}

async function searchImages(searchTerm) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderImages(data.hits);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    Notiflix.Notify.warning('Please enter a search query!');
    return;
  }

  searchImages(searchTerm);
};

