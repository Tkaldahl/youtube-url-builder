import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
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
    @Input() videoId: string = '';
    @ViewChild('ytContainer') ytContainer!: ElementRef;
    @ViewChild('ytPlayer') ytPlayer!: ElementRef; // Add this line

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        // Load the IFrame Player API code asynchronously.
        var youtubePlayerElement = this.renderer.createElement('script');
        youtubePlayerElement.src = "https://www.youtube.com/player_api";
        this.renderer.appendChild(this.ytContainer.nativeElement, youtubePlayerElement);

        // Replace the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
        this.onYouTubePlayerAPIReady();
    }

    onYouTubePlayerAPIReady() {
        new YT.Player(this.ytPlayer?.nativeElement, {
            height: '360',
            width: '640',
            videoId: 'M7lc1UVf-VE'
        });
    }
}