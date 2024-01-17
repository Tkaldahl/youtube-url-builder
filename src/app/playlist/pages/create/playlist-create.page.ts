import { Component, WritableSignal, signal } from '@angular/core';
import { YoutubeService } from '../../../youtube/services/youtube.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubePlayerComponent } from '../../../youtube/components/player/youtube-player.component';
import { YTSearchResultComponent } from '../../../youtube/components/search-result/yt-search-result.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, YoutubePlayerComponent, YTSearchResultComponent],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: './playlist-create.page.html',
  styleUrls: ['./playlist-create.page.scss']
})
export class PlaylistCreatePage {
  query = '';
  videos: any[] = [];
  videoId: WritableSignal<string> = signal("");
  searchDebouncer: NodeJS.Timeout = setTimeout(() => {}, 0);

  constructor(private youtubeService: YoutubeService) {}

  debounceSearch(event: Event) {
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


  loadVideo(videoId: string) {
    this.videoId.set(videoId)
  }
}
