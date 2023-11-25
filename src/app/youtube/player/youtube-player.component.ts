import { AfterViewInit, Component, ElementRef, Input, Renderer2, Signal, ViewChild, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
    selector: 'youtube-player-component',
    templateUrl: './youtube-player.component.html',
    standalone: true,
    exportAs: 'youtubePlayer',
    imports: [FormsModule, YouTubePlayerModule],
})
export class YoutubePlayerComponent implements AfterViewInit {
    @Input() videoId!: Signal<string>;
    @ViewChild('ytContainer') ytContainer!: ElementRef;
    @ViewChild('ytPlayerElement') ytPlayerElement!: ElementRef;
    ytPlayer: YT.Player | undefined


    constructor(private renderer: Renderer2) {
        effect(() => {
            this.ytPlayer?.cueVideoById(this.videoId());
            this.playVideo();
        });
    }

    ngAfterViewInit(): void {
        // Load the IFrame Player API code asynchronously.
        var youtubePlayerElement = this.renderer.createElement('script');
        youtubePlayerElement.src = "https://www.youtube.com/player_api";
        this.renderer.appendChild(this.ytContainer.nativeElement, youtubePlayerElement);

        // Replace the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
        this.ytPlayer = this.onYouTubePlayerAPIReady();
    }

    onYouTubePlayerAPIReady(): YT.Player {
        return new YT.Player(this.ytPlayerElement?.nativeElement, {
            height: '360',
            width: '640',
            videoId: ""
        });
    }

    private playVideo(): void {
        setTimeout(() => {
            this.ytPlayer?.playVideo();
        }, 250)
    }
}