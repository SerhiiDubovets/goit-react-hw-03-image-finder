import axios from 'axios';
const API_KEY = '27695405-68b104771e9635aa9e6d8bef2';
const URL = `https://pixabay.com/api/`;

export async function getGallery(galleryName, page) {
  return await axios.get(
    `${URL}?q=${galleryName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
