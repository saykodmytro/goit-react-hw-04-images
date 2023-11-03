import axios from 'axios';

async function fetchPhotos(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const resp = await axios(BASE_URL, {
    params: {
      key: '39430730-0a1aacc0e107061ec7cb5615a',
      q: query,
      image_type: 'photo',
      page: page,
      per_page: 12,
    },
  });
  return resp.data;
}

export default fetchPhotos;
