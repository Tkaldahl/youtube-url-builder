import { CommonModule } from "@angular/common";
import { Component, OnInit, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'playlist-search',
    imports: [CommonModule, FormsModule],
    standalone: true,
    providers: [],
    templateUrl: './playlist-search.page.html',
    styleUrls: ['./playlist-search.page.scss']
})
export class PlaylistSearchComponent implements OnInit {
    allPlaylists: PlaylistDoc[] = [];

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
            this.allPlaylists = playlistDocs;
            console.log(this.allPlaylists);
        }).catch(error => {
            console.error(error);
        });
    }
}

export interface PlaylistDoc {
    _id: string;
    name: string;
    playlist: string[];
}