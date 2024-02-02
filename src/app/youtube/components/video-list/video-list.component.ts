import { Component, EventEmitter, Input, Output, Signal, effect } from "@angular/core";
import { YTVideoMetadata, YoutubeService } from "../../services/youtube.service";
import { CommonModule } from "@angular/common";
import { ExportToParentRequest } from "../../../playlist/shared/models/signal.models";
import { SavePlaylistRequest } from "../../../playlist/shared/models/playlist.models";

@Component({
  selector: "video-list",
  imports: [CommonModule],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.scss"]
})
export class VideoListComponent {
  @Input() newVideo!: Signal<YTVideoMetadata>;
  @Input() exportPlaylistReq!: Signal<ExportToParentRequest>;
  @Output() exportedPlaylist = new EventEmitter<SavePlaylistRequest>();
  playlist: YTVideoMetadata[] = [];
  transitionVideo: YTVideoMetadata | null = null;

  constructor(private youtubeService: YoutubeService) {
    effect(() => {
      this.newVideo()
      if (this.newVideo().videoId) {
        if (this.newVideo().isTransition) {
          this.transitionVideo = this.newVideo();
        } else {
          this.playlist.push(this.newVideo());
        }
      }
    });

    effect(() => {
      let reqId = this.exportPlaylistReq().requestId;
      if (reqId) {
        this.exportPlaylist()
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

    const savePlaylistReq: SavePlaylistRequest = {
      "playlist_name": "test_playlist", // TODO: get this from the user
      "video_urls": video_urls,
      "transition_video_url": transition_video_url
    };

    this.exportedPlaylist.emit(savePlaylistReq);
  }
}
