import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {YoutubeService, YTVideoMetadata} from "../../services/youtube.service";

@Component({
  selector: "youtube-player-component",
  templateUrl: "./youtube-player.component.html",
  styleUrls: ["./youtube-player.component.scss"],
  standalone: true,
  exportAs: "youtubePlayer",
  providers: [YoutubeService],
  imports: [FormsModule, YouTubePlayerModule]
})
export class YoutubePlayerComponent implements AfterViewInit, OnDestroy {
  @Input() videoId!: Signal<string>;
  @Input() getMetaDataReq!: Signal<GetMetaDataRequest>;
  @Output() videoMetaData = new EventEmitter();
  @ViewChild("ytContainer") ytContainer!: ElementRef;
  @ViewChild("ytPlayerElement") ytPlayerElement!: ElementRef;
  ytApiState: WritableSignal<YoutubeApiState> = signal(YoutubeApiState.Loading);
  ytPlayer: YT.Player | null = null;
  apiStateChecker: NodeJS.Timeout | undefined;


  constructor(private renderer: Renderer2, private youtubeService: YoutubeService) {
    effect(() => {
      this.videoId();
      if (this.ytPlayer) {
        this.ytPlayer?.cueVideoById(this.videoId());
        this.playVideo();
      }
    });

    effect(() => {
      let reqId = this.getMetaDataReq().requestId;
      if (reqId) {
        this.getVideoMetaDataAndEmit()
      }
    });

    effect(() => {
      this.ytApiState();
      if (this.ytApiState() == YoutubeApiState.Ready) {
        this.ytPlayer = this.onYouTubePlayerAPIReady();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeYoutubeApi();
    this.notifyWhenYoutubeApiIsReady();
  }

  ngOnDestroy(): void {
    this.ytPlayer?.destroy();
  }

  private initializeYoutubeApi(): void {
    // Load the IFrame Player API code asynchronously.
    const youtubePlayerElement = this.renderer.createElement("script");
    youtubePlayerElement.src = "https://www.youtube.com/player_api";
    this.renderer.appendChild(this.ytContainer.nativeElement, youtubePlayerElement);
  }

  private notifyWhenYoutubeApiIsReady(): void {
    clearTimeout(this.apiStateChecker);
    const maxAttempts = 5;
    let attempts = 0;

    this.apiStateChecker = setInterval(() => {
      attempts++;

      if (this.ytModelsAreAvailable()) {
        this.ytApiState.set(YoutubeApiState.Ready);
        clearTimeout(this.apiStateChecker);
      } else {
        // console.log(`Youtube Api not ready yet. State: ${this.ytApiState()}`);
      }

      if (attempts == maxAttempts) {
        this.ytApiState.set(YoutubeApiState.Error);
        console.log(`Failed to load Youtube Api.`);
        clearTimeout(this.apiStateChecker);
      }
    }, 250);
  }

  private ytModelsAreAvailable(): boolean {
    return typeof (YT) != "undefined" && typeof (YT.Player) != "undefined";
  }

  private onYouTubePlayerAPIReady(): YT.Player | null {
    var ytPlayerInstance = null;

    if (this.ytModelsAreAvailable()) {
      ytPlayerInstance = new YT.Player(this.ytPlayerElement?.nativeElement, {
        height: "360",
        width: "640",
        videoId: ""
      });
    } else {
      console.error("YT is undefined. YT Api State: " + this.ytApiState());
    }

    return ytPlayerInstance;
  }

  private playVideo(): void {
    setTimeout(() => {
      console.log("Player state is: " + this.ytPlayer?.getPlayerState());
      this.ytPlayer?.playVideo();
    }, 250)
  }

  private getVideoMetaDataAndEmit(): void {
    // this.ytPlayer?.pauseVideo();
    const videoUrl = this.ytPlayer?.getVideoUrl();
    const videoId = videoUrl?.split("v=")[1]?.split("&")[0];
    if (videoId) {
      this.youtubeService.getYTVideoMetadata(videoId)
        .then((metadata) => {
          const timeStamp = /*this.ytPlayer?.getCurrentTime()*/ this.generateRandomTimeStamp(this.ytPlayer?.getDuration());
          metadata.timeStamp = timeStamp;
          metadata.isTransition = this.getMetaDataReq().isTransition;

          this.videoMetaData.emit(metadata);
        });
    }
  }

  private generateRandomTimeStamp(duration: number | undefined): number {
    if (duration) {
      const minTime = 15;
      let maxTime = duration - 120; // Target the most likely high point in the song with your random selection.
      if (maxTime < 0) {
        maxTime = duration - 60; // Fallback to the minimum duration - must leave at least 60 seconds of playtime.
        if (maxTime < 0) { return 0; }
      }
      
      return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    } else {
      return 0;
    }
  }
}

enum YoutubeApiState {
  Error = -1,
  Loading = 0,
  Ready = 1,
}

export interface GetMetaDataRequest {
  requestId: string | null;
  isTransition: boolean;
}
