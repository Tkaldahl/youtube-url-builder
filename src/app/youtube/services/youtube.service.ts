import axios from 'axios';

export class YoutubeService {
  async searchVideos(query: string): Promise<any> {
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

  async getYTVideoMetadata(videoId: string): Promise<YTVideoMetadata> {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: 'AIzaSyAMxUBqUZNDTe3FHd7yeCk1pGsnp9uqXZQ',
      },
    });

    const videoData = response.data?.items?.[0];
    const metadata: YTVideoMetadata = {
      videoId: videoData.id,
      timeStamp: undefined,
      title: videoData.snippet.title,
      tags: videoData.snippet.tags,
    };

    return metadata;
  }

  getThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }
}

export interface YTVideoMetadata {
  videoId: string | undefined;
  timeStamp: number | undefined;
  title: string | undefined;
  tags: string[] | undefined;
}
