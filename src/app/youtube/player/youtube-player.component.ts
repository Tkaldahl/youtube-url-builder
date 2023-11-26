import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, Signal, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
    selector: 'youtube-player-component',
    templateUrl: './youtube-player.component.html',
    standalone: true,
    exportAs: 'youtubePlayer',
    imports: [FormsModule, YouTubePlayerModule],
})
export class YoutubePlayerComponent implements AfterViewInit, OnDestroy {
    @Input() videoId!: Signal<string>;
    @ViewChild('ytContainer') ytContainer!: ElementRef;
    @ViewChild('ytPlayerElement') ytPlayerElement!: ElementRef;
    ytApiState: WritableSignal<YoutubeApiState> = signal(YoutubeApiState.Loading);
    ytPlayer: YT.Player | null = null;
    apiStateChecker: NodeJS.Timeout | undefined;


    constructor(private renderer: Renderer2) {
        effect(() => {
            this.videoId();
            if (this.ytPlayer) {
                this.ytPlayer?.cueVideoById(this.videoId());
                this.playVideo();
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

    initializeYoutubeApi(): void {
        // Load the IFrame Player API code asynchronously.
        const youtubePlayerElement = this.renderer.createElement('script');
        youtubePlayerElement.src = "https://www.youtube.com/player_api";
        this.renderer.appendChild(this.ytContainer.nativeElement, youtubePlayerElement);
    }

    notifyWhenYoutubeApiIsReady(): void {
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

    ytModelsAreAvailable(): boolean {
        return typeof(YT) != 'undefined' && typeof(YT.Player) != 'undefined';
    }

    onYouTubePlayerAPIReady(): YT.Player | null {
        var ytPlayerInstance = null;

        if (this.ytModelsAreAvailable()) {
            ytPlayerInstance = new YT.Player(this.ytPlayerElement?.nativeElement, {
                height: '360',
                width: '640',
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
}

enum YoutubeApiState
    {
        Error = -1,
        Loading = 0,
        Ready = 1,
    }