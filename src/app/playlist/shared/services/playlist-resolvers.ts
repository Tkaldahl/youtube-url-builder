import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PlaylistDoc } from '../models/playlist.models';
import { EMPTY, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { PlaylistApiService } from './playlist-api.service';

export const playlistResolver: ResolveFn<PlaylistDoc | null> = (
  route: ActivatedRouteSnapshot,
  snapshot: RouterStateSnapshot,
): Observable<PlaylistDoc | null> => {

  let playlistId = route.paramMap.get('playlistId');
  if (playlistId) {
    return inject(PlaylistApiService).getPlaylistById({playlist_id: playlistId})
      .pipe(getPlaylistByIdResponse => {
        return getPlaylistByIdResponse;
      });
  } else {
    console.error('No playlistId found in route');
    return EMPTY;
  }
};