import exp from "constants";
import { YTVideoMetadata } from "../../../youtube/services/youtube.service";

export interface PlaylistDoc {
    _id: string;
    name: string;
    playlist: YTVideoMetadata[];
    transition_video: YTVideoMetadata | null;
}

export interface SavePlaylistRequest {
    playlist_name: string | null;
    playlist: YTVideoMetadata[];
    transition_video: YTVideoMetadata | null;
}

export interface SavePlaylistResponse {
    playlist_id: string;
}

export interface GetAllPlaylistsRequest {
    // No fields
}

export interface GetAllPlaylistsResponse {
    playlists: PlaylistDoc[];
}

export interface GetPlaylistByIdRequest {
    playlist_id: string;
}

export interface GetPlaylistByIdResponse {
    playlist: PlaylistDoc;
}

export interface SearchPlaylistRequest {
    search_term: string;
}

export interface SearchPlaylistResponse {
    playlists: PlaylistDoc[];
}

export interface DeletePlaylistRequest {
    playlist_id: string;
}

export interface DeletePlaylistResponse {
    // No fields
}
