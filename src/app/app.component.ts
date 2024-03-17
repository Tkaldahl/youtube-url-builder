import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { PlaylistApiService } from "./playlist/shared/services/playlist-api.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  providers: [PlaylistApiService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  title = "youtube-url-builder";

  constructor(private router: Router, private playlistService: PlaylistApiService) {}

  createAndForwardToNewPlaylist() {
    this.playlistService.savePlaylist({
      playlist_name: null,
      playlist: [],
      transition_video: null
    }).subscribe(savePlaylistResponse => {
      const newPlaylistId = savePlaylistResponse.playlist_id;
      this.router.navigateByUrl("/playlist/" + newPlaylistId);
    });
  }
}
