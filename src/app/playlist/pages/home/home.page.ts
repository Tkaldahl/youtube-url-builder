import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaylistApiService } from "../../shared/services/playlist-api.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { PlaylistSearchBarComponent } from "../../components/playlist-search-bar/playlist-search-bar.component";
import { PopularPlaylistsScrollerComponent } from "../../components/popuplar-playlists-scroller/popular-playlists-scroller.component";

@Component({
  selector: "home",
  imports: [
    CommonModule,
    FormsModule,
    PlaylistSearchBarComponent,
    PopularPlaylistsScrollerComponent,
    RouterOutlet
  ],
  standalone: true,
  providers: [PlaylistApiService],
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {

    constructor(private router: Router, private playlistService: PlaylistApiService) {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    createAndForwardToNewPlaylist() {
        this.playlistService.savePlaylist({
          id: null,
          playlistName: null,
          playlist: [],
          transitionVideo: null
        }).subscribe(savePlaylistResponse => {
          const newPlaylistId = savePlaylistResponse.playlist_id;
          this.router.navigateByUrl("/playlist/" + newPlaylistId);
        });
      }
    
}
