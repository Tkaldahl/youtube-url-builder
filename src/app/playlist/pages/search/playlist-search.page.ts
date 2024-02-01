import { CommonModule } from "@angular/common";
import { Component, OnInit, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaylistSearchResultComponent } from "../../components/playlist-search-result/playlist-search-result.component";
import { PlaylistDoc } from "../../shared/models/playlist.models";
import { PlaylistApiService } from "../../shared/playlist-api.service";

@Component({
    selector: "playlist-search",
    imports: [CommonModule, FormsModule, PlaylistSearchResultComponent],
    standalone: true,
    providers: [PlaylistApiService],
    templateUrl: "./playlist-search.page.html",
    styleUrls: ["./playlist-search.page.scss"]
})
export class PlaylistSearchPage implements OnInit {
    searchText: string = "";
    playlists: PlaylistDoc[] = [];

    constructor(private playlistApi: PlaylistApiService) {}

    ngOnInit(): void {
        this.getAllPlaylists();
    }

    getAllPlaylists(): void {
        this.playlistApi.getAllPlaylists().subscribe((response: any) => {
            this.playlists = response.playlists as PlaylistDoc[];
        });
    }

    searchPlaylists(): void {
        this.playlistApi.searchPlaylists({ search_term: this.searchText }).subscribe((response: any) => {
            this.playlists = response.playlists as PlaylistDoc[];
        });
    }

    deletePlaylist(playlist: PlaylistDoc): void {
        this.playlistApi.deletePlaylist({ playlist_id: playlist._id }).subscribe(() => {
            this.playlists = this.playlists.filter((p: PlaylistDoc) => p._id !== playlist._id);
        });
    }


    loadPlaylist(playlist: PlaylistDoc): void {
        console.log(playlist);
    }
}