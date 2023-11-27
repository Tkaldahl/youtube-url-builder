import { Component, WritableSignal, signal } from '@angular/core';
import { YoutubeService } from '../../youtube.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubePlayerComponent } from '../../player/youtube-player.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, YoutubePlayerComponent],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: './search.page.html',
})
export class SearchComponent {
  query = '';
  videos: any[] = [];
  videoId: WritableSignal<string> = signal("");

  constructor(private youtubeService: YoutubeService) {}

  async search(): Promise<void> {
    this.videos = await this.youtubeService.searchVideos(this.query);
  }

  loadVideo(videoId: string) {
    this.videoId.set(videoId)
  }
}
