import exp from "constants";

export interface PlaylistDoc {
    _id: string;
    name: string;
    playlist: string[];
}

export interface SavePlaylistRequest {
    playlist_name: string | null;
    video_urls: string[];
    transition_video_url: string;
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
