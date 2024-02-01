import { Component, Input, Signal, effect } from "@angular/core";
import { YTVideoMetadata, YoutubeService } from "../../services/youtube.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "yt-search-result",
  imports: [CommonModule],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: "./yt-search-result.component.html",
  styleUrls: ["./yt-search-result.component.scss"],
})
export class YTSearchResultComponent {
  @Input() ytVideoMetadata!: YTVideoMetadata;

  constructor(private youtubeService: YoutubeService) {}

  getThumbnailUrl(video: YTVideoMetadata): string {
    if (video.videoId) {
        return this.youtubeService.getThumbnailUrl(video.videoId);
    } else {
        return "";
    }
  }
}
