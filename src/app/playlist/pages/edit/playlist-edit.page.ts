import {Component, OnDestroy, OnInit, signal, WritableSignal} from "@angular/core";
import {YoutubeService, YTVideoMetadata, YTVideoMetaDataImpl} from "../../../youtube/services/youtube.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GetMetaDataRequest, YoutubePlayerComponent} from "../../../youtube/components/player/youtube-player.component";
import {YTSearchResultComponent} from "../../../youtube/components/search-result/yt-search-result.component";
import {VideoListComponent} from "../../../youtube/components/video-list/video-list.component";
import {ExportToParentRequest} from "../../shared/models/signal.models";
import {PlaylistApiService} from "../../shared/services/playlist-api.service";
import {PlaylistDoc, SavePlaylistRequest} from "../../shared/models/playlist.models";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";


@Component({
  selector: "playlist-edit",
  imports: [CommonModule, FormsModule, YoutubePlayerComponent, YTSearchResultComponent, VideoListComponent],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: "./playlist-edit.page.html",
  styleUrls: ["./playlist-edit.page.scss"]
})
export class PlaylistEditPage implements OnInit, OnDestroy {
  private PLAYLISTDOC_PLACEHOLDER: PlaylistDoc = { _id: "", name: "", playlist: [], transition_video: null };
  playlist$: Subscription | null = null;
  playlist: PlaylistDoc = this.PLAYLISTDOC_PLACEHOLDER;
  playlistSignal: WritableSignal<PlaylistDoc> = signal(this.PLAYLISTDOC_PLACEHOLDER);
  query = "";
  getMetaDataReq: WritableSignal<GetMetaDataRequest> = signal({requestId: null, isTransition: false});
  videos: any[] = [];
  videoId: WritableSignal<string> = signal("");
  searchDebouncer: NodeJS.Timeout = setTimeout(() => {
  }, 0);
  newVideoSelection: WritableSignal<YTVideoMetadata> = signal({
    videoId: undefined,
    timeStamp: undefined,
    title: undefined,
    tags: undefined,
    channelTitle: undefined,
    published: undefined,
    isTransition: undefined
  });
  exportPlaylistReq: WritableSignal<ExportToParentRequest> = signal({
    requestId: null
  });

  // TODO: Implement logic for the following fields
  playlistVisibility: "Public" | "Private" = "Public";
  playlistImage: string = "https://i.ytimg.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg";

  constructor(
    private playlistApi: PlaylistApiService,
    private route: ActivatedRoute,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {
    this.playlist$ = this.route.data.subscribe(playlistResolver => {
      this.playlist = playlistResolver["playlistResolverRes"]?.["playlist"];
      this.playlistSignal.set(this.playlist);
    });
  }

  ngOnDestroy(): void { 
    this.playlist$?.unsubscribe();
  }

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
    const searchResultMetaData = this.videos.filter(video => video.videoId === videoMetaData.videoId)[0];
    let metaDataKeys = Object.keys(new YTVideoMetaDataImpl());
    const enhancedMetaData = new YTVideoMetaDataImpl(
      ...metaDataKeys.map(key => searchResultMetaData[key as keyof YTVideoMetadata] || videoMetaData[key as keyof YTVideoMetadata])
    );

    this.newVideoSelection.set(enhancedMetaData);
  }

  public getVideoMetaData(isTransition: boolean) {
    const requestId = this.generateUuidv4();
    this.getMetaDataReq.set({requestId, isTransition});
  }

  public getCurrentPlaylistData() {
    const requestId = this.generateUuidv4();
    this.exportPlaylistReq.set({requestId});
  }

  public handleExportedPlaylist(exportedPlaylist: SavePlaylistRequest) {
    if (exportedPlaylist.playlist_name === null) {
      exportedPlaylist.playlist_name = `Playlist ${new Date().toISOString()}`;
    }

    this.playlistApi.savePlaylist(exportedPlaylist).subscribe((response) => {
      console.log(response);
    });
  }

  private generateUuidv4(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


