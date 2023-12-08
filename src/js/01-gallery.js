import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const boxGallery = document.querySelector('ul.gallery');
console.log(boxGallery);

const itemFromGallery = galleryItems
  .map(
    ({ preview, original, description }) => `<div class = "gallery">
    <a class="gallery__link" href="${original}">
   <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</div>`
  )
  .join('');
boxGallery.insertAdjacentHTML('afterbegin', itemFromGallery);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
});
