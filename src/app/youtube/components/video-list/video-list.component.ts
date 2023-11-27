import { Component, Input, Signal, effect } from '@angular/core';
import { YTVideoMetadata, YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'video-list',
  imports: [CommonModule],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: './video-list.component.html',
})
export class VideoListComponent {
  @Input() newVideo!: Signal<YTVideoMetadata>;
  playlist: YTVideoMetadata[] = [];

  constructor(private youtubeService: YoutubeService) {
    effect(() => {
        this.newVideo()
        this.playlist.push(this.newVideo());
    });
  }

  getThumbnailUrl(video: YTVideoMetadata): string {
    if (video.videoId) {
        return this.youtubeService.getThumbnailUrl(video.videoId);
    } else {
        return "";
    }
  }
}
