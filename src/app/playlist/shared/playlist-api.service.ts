import { Injectable } from "@angular/core";
import { DeletePlaylistRequest, SavePlaylistRequest, SearchPlaylistRequest } from "./models/playlist.models";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class PlaylistApiService {
    constructor(private http: HttpClient) {}
  
    public savePlaylist(savePlaylistReq: SavePlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/save_playlist", savePlaylistReq, {});
    }

    public getAllPlaylists(): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/get_all_playlists", {});
    }

    public searchPlaylists(searchReq: SearchPlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/search_playlists", searchReq);
    }

    public deletePlaylist(deletePlaylistReq: DeletePlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/delete_playlist", deletePlaylistReq);
    }
}