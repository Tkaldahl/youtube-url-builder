import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { YTVideoMetadata } from "../../../youtube/services/youtube.service";

@Component({
    selector: "playlist-search-result",
    imports: [CommonModule, FormsModule],
    standalone: true,
    providers: [],
    templateUrl: "./playlist-search-result.component.html",
    styleUrls: ["./playlist-search-result.component.scss"]
  })
  export class PlaylistSearchResultComponent {
    @Input() playlistMetadata!: PlaylistMetadata;
  
    constructor() {}

    getThumbnailUrl(video: PlaylistMetadata): string {
      // TODO: implement
      return "";
    }

  }  

export interface PlaylistMetadata {
  _id: string;
  name: string;
  playlist: YTVideoMetadata[];
}