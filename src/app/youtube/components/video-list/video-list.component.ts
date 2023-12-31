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
  @Input() newPlaylistVideo!: Signal<YTVideoMetadata>;
  @Input() newTransitionVideo!: Signal<YTVideoMetadata>;
  playlist: YTVideoMetadata[] = [];
  transitionVideo: YTVideoMetadata | null = null;

  constructor(private youtubeService: YoutubeService) {
    effect(() => {
      this.newPlaylistVideo()
      if (this.newPlaylistVideo().videoId) {
          this.playlist.push(this.newPlaylistVideo());
      }
      this.newTransitionVideo()
        if (this.newTransitionVideo().videoId) {
            this.transitionVideo = this.newTransitionVideo();
        }
    });
  }

  getThumbnailUrl(video: YTVideoMetadata): string {
    if (video.videoId) {
        return this.youtubeService.getThumbnailUrl(video.videoId);
    } else {
        return "";
    }
  }

  exportPlaylist() {
    let video_urls: string[] = [];
    let transition_video_url = "";

    if (this.playlist.length > 0) {
      video_urls = this.playlist.map(video => {
        return `https://www.youtube.com/watch?v=${video.videoId}`;
      });
    }

    if (this.transitionVideo) {
      transition_video_url = `https://www.youtube.com/watch?v=${this.transitionVideo.videoId}`;
    }

    const process_video_req = {
      "video_urls": video_urls,
      "transition_video_url": transition_video_url
    };

    const length = JSON.stringify(process_video_req).length.toString();
    fetch('http://127.0.0.1:5000/process_video', {
 
      method: 'POST',
      mode: 'cors', // Add this line to enable CORS
      body: JSON.stringify(process_video_req)
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
