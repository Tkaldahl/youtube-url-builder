import { Injectable } from '@angular/core';
import { PlaylistDoc, SavePlaylistRequest } from './models/playlist.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PlaylistApiService {
    constructor(private http: HttpClient) {}
  
    public savePlaylist(savePlaylistReq: SavePlaylistRequest): Observable<any> {
        const length = JSON.stringify(savePlaylistReq).length.toString();
        return this.http.post('http://127.0.0.1:5000/save_playlist', savePlaylistReq);
    }
}