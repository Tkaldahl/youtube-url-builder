import { Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { YTVideoMetadata, YoutubeService } from '../../../youtube/services/youtube.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetMetaDataRequest, YoutubePlayerComponent } from '../../../youtube/components/player/youtube-player.component';
import { YTSearchResultComponent } from '../../../youtube/components/search-result/yt-search-result.component';
import { VideoListComponent } from '../../../youtube/components/video-list/video-list.component';


@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, YoutubePlayerComponent, YTSearchResultComponent, VideoListComponent],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: './playlist-create.page.html',
  styleUrls: ['./playlist-create.page.scss']
})
export class PlaylistCreatePage {
  query = '';
  getMetaDataReq: WritableSignal<GetMetaDataRequest> = signal({requestId: "", isTransition: false});
  videos: any[] = [];
  videoId: WritableSignal<string> = signal("");
  searchDebouncer: NodeJS.Timeout = setTimeout(() => {}, 0);
  newVideoSelection: WritableSignal<YTVideoMetadata> = signal({
    videoId: undefined,
    timeStamp: undefined,
    title: undefined,
    tags: undefined,
    channelTitle: undefined,
    published: undefined,
    isTransition: undefined
  });


  constructor(private youtubeService: YoutubeService) {}

  public debounceSearch(event: Event) {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
  
    // Ignore all special keys. Immediately search on "Enter". Debounce search on all other keys.
    switch (event.key) {
      case "ArrowDown":
        break;
      case "ArrowUp":
        break;
      case "ArrowLeft":
        break;
      case "ArrowRight":
        break;
      case "Escape":
        break;
      case "Enter":
        clearTimeout(this.searchDebouncer);
        this.search();
        break;
      default:
        clearTimeout(this.searchDebouncer);
        this.searchDebouncer = setTimeout(() => {
          this.search();
        }, 1500);
        return;
    }
  }

  private async search(): Promise<void> {
    this.videos = await this.youtubeService.searchVideos(this.query);
  }


  public loadVideo(videoId: string) {
    this.videoId.set(videoId)
  }

  public handleVideoMetaData(videoMetaData: YTVideoMetadata) {
    console.log(videoMetaData);
    this.newVideoSelection.set(videoMetaData);
  }

  public getVideoMetaData(isTransition: boolean) {
    const requestId = this.generateUuidv4();
    this.getMetaDataReq.set({requestId, isTransition});
  }

  private generateUuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }
}


