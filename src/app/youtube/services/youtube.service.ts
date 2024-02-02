import axios from "axios";

export class YoutubeService {
  async searchVideos(query: string): Promise<YTVideoMetadata[]> {
    // TODO: Use HTTP instead of axios and remove dependancy
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyAMxUBqUZNDTe3FHd7yeCk1pGsnp9uqXZQ",
        q: query,
      },
    });

    return response.data.items.map((item: any) => {
      let snippet = item.snippet;
      snippet.id = item.id.videoId;
      return this.snippetToYTMetadata(snippet);
    });
  }

  async getYTVideoMetadata(videoId: string): Promise<YTVideoMetadata> {
    // TODO: Use HTTP instead of axios and remove dependancy
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        id: videoId,
        key: "AIzaSyAMxUBqUZNDTe3FHd7yeCk1pGsnp9uqXZQ",
      },
    });

    const videoSnippet = response.data?.items?.[0];
    return this.snippetToYTMetadata(videoSnippet);
  }

  snippetToYTMetadata(snippet: any): YTVideoMetadata {
    return {
      videoId: snippet.id,
      timeStamp: undefined,
      title: snippet.title,
      tags: snippet.tags,
      channelTitle: snippet.channelTitle,
      published: new Date(snippet.publishedAt),
      isTransition: undefined
    };
  }

  getThumbnailUrl(videoId: string): string {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
}

export interface YTVideoMetadata {
  timeStamp: number | undefined;
  isTransition: boolean | undefined;
  
  readonly videoId: string | undefined;
  readonly title: string | undefined;
  readonly tags: string[] | undefined;
  readonly channelTitle: string | undefined;
  readonly published: Date | undefined;
}
