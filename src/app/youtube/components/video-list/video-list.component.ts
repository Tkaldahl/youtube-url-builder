import { Component, EventEmitter, Input, Output, Signal, effect, signal } from "@angular/core";
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
  private PLAYLISTDOC_PLACEHOLDER: PlaylistDoc = { _id: "", name: "", playlist: [], transition_video: null };

  @Input() savedPlaylist: Signal<PlaylistDoc> = signal(this.PLAYLISTDOC_PLACEHOLDER);
  @Input() newVideo!: Signal<YTVideoMetadata>;
  @Input() exportPlaylistReq!: Signal<ExportToParentRequest>;
  @Output() exportedPlaylist = new EventEmitter<SavePlaylistRequest>();
  playlistDoc: PlaylistDoc = this.PLAYLISTDOC_PLACEHOLDER;
  // transitionVideo: YTVideoMetadata | null = null;

  constructor(private youtubeService: YoutubeService) {
    effect(() => {
      this.newVideo();
      if (this.newVideo()?.videoId) {
        if (this.newVideo()?.isTransition) {
          this.playlistDoc.transition_video = this.newVideo();
        } else {
          this.playlistDoc.playlist.push(this.newVideo());
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
      if (this.savedPlaylist()) {
        this.playlistDoc = this.savedPlaylist();
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
      _id: this.playlistDoc._id,
      playlist_name: this.playlistDoc.name,
      playlist: this.playlistDoc.playlist,
      transition_video: this.playlistDoc.transition_video
    };

    this.exportedPlaylist.emit(savePlaylistReq);
  }
}
