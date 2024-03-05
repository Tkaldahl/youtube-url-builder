import { Component, EventEmitter, Input, Output, Signal, effect } from "@angular/core";
import { YTVideoMetadata, YoutubeService } from "../../services/youtube.service";
import { CommonModule } from "@angular/common";
import { ExportToParentRequest } from "../../../playlist/shared/models/signal.models";
import { PlaylistDoc, SavePlaylistRequest } from "../../../playlist/shared/models/playlist.models";

@Component({
  selector: "video-list",
  imports: [CommonModule],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.scss"]
})
export class VideoListComponent {
  @Input() savedPlaylist!: Signal<PlaylistDoc | null>;
  @Input() newVideo!: Signal<YTVideoMetadata>;
  @Input() exportPlaylistReq!: Signal<ExportToParentRequest>;
  @Output() exportedPlaylist = new EventEmitter<SavePlaylistRequest>();
  playlist: YTVideoMetadata[] = [];
  transitionVideo: YTVideoMetadata | null = null;

  constructor(private youtubeService: YoutubeService) {
    effect(() => {
      this.newVideo();
      if (this.newVideo()?.videoId) {
        if (this.newVideo()?.isTransition) {
          this.transitionVideo = this.newVideo();
        } else {
          this.playlist.push(this.newVideo());
        }
      }
    });

    effect(() => {
      let reqId = this.exportPlaylistReq()?.requestId;
      if (reqId) {
        this.exportPlaylist()
      }
    });

    effect(() => {
      if (this.savedPlaylist()?.playlist) {
        this.playlist = this.savedPlaylist()?.playlist || [];
        this.transitionVideo = this.savedPlaylist()?.transition_video || null;
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
    const savePlaylistReq: SavePlaylistRequest = {
      "playlist_name": null,
      "playlist": this.playlist,
      "transition_video": this.transitionVideo
    };

    this.exportedPlaylist.emit(savePlaylistReq);
  }
}
