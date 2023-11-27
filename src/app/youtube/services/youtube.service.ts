import axios from 'axios';

export class YoutubeService {
  async searchVideos(query: string) {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyAMxUBqUZNDTe3FHd7yeCk1pGsnp9uqXZQ',
        q: query,
      },
    });

    return response.data.items;
  }
}
