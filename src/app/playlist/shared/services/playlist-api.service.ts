import { Injectable } from "@angular/core";
import { DeletePlaylistRequest, GetPlaylistByIdRequest, PlaylistDoc, SavePlaylistRequest, SearchPlaylistRequest } from "../models/playlist.models";
import { EMPTY, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class PlaylistApiService {
    private api: any;

    constructor(private http: HttpClient) {
        // TODO: Deploy api wrapper with swagger and then populate this.api with the actual api
    }
  
    public savePlaylist(savePlaylistReq: SavePlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/save_playlist", savePlaylistReq, {});
    }

    public getAllPlaylists(): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/get_all_playlists", {});
    }

    public getPlaylistById(getPlaylistByIdReq: GetPlaylistByIdRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/get_playlist_by_id", getPlaylistByIdReq, {});
    }

    public searchPlaylists(searchReq: SearchPlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/search_playlists", searchReq);
    }

    public deletePlaylist(deletePlaylistReq: DeletePlaylistRequest): Observable<any> {
        return this.http.post("http://127.0.0.1:5000/delete_playlist", deletePlaylistReq);
    }
}