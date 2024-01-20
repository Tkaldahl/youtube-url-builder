import { CommonModule } from "@angular/common";
import { Component, OnInit, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaylistSearchResultComponent } from "../../components/playlist-search-result/playlist-search-result.component";

@Component({
    selector: 'playlist-search',
    imports: [CommonModule, FormsModule, PlaylistSearchResultComponent],
    standalone: true,
    providers: [],
    templateUrl: './playlist-search.page.html',
    styleUrls: ['./playlist-search.page.scss']
})
export class PlaylistSearchPage implements OnInit {
    searchText: string = '';
    playlists: PlaylistDoc[] = [];

    constructor() {}

    ngOnInit(): void {
        this.getAllPlaylists();
    }

    getAllPlaylists(): void {
        fetch('http://127.0.0.1:5000/get_all_playlists', {
            method: 'POST',
            mode: 'cors',
        }).then((response: Response) => {
            return response.json();
        }).then((playlistDocs: PlaylistDoc[]) => {
            this.playlists = playlistDocs;
        }).catch(error => {
            console.error(error);
        });
    }

    searchPlaylists(): void {
        const body = { search_term: this.searchText };

        fetch('http://127.0.0.1:5000/search_playlists', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
        }).then((response: Response) => {
            return response.json();
        }).then((playlistDocs: PlaylistDoc[]) => {
            this.playlists = playlistDocs;
        }).catch(error => {
            console.error(error);
        });

    }

    loadPlaylist(playlist: PlaylistDoc): void {
        console.log(playlist);
    }
}

export interface PlaylistDoc {
    _id: string;
    name: string;
    playlist: string[];
}
