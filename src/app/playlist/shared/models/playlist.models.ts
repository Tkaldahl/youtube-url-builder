import exp from "constants";
import { YTVideoMetadata } from "../../../youtube/services/youtube.service";

export interface PlaylistDoc {
    id: string;
    name: string;
    playlist: YTVideoMetadata[];
    coverImage: string | null;
    transitionVideo: YTVideoMetadata | null;
}

export interface SavePlaylistRequest {
    id: string | null;
    playlistName: string | null;
    playlist: YTVideoMetadata[];
    transitionVideo: YTVideoMetadata | null;
}

export interface SavePlaylistResponse {
    playlistId: string;
}

export interface GetAllPlaylistsRequest {
    // No fields
}

export interface GetAllPlaylistsResponse {
    playlists: PlaylistDoc[];
}

export interface GetPlaylistByIdRequest {
    playlistId: string;
}

export interface GetPlaylistByIdResponse {
    playlist: PlaylistDoc;
}

export interface SearchPlaylistRequest {
    searchTerm: string;
}

export interface SearchPlaylistResponse {
    playlists: PlaylistDoc[];
}

export interface DeletePlaylistRequest {
    playlistId: string;
}

export interface DeletePlaylistResponse {
    // No fields
}
