import { RouterModule, Routes } from "@angular/router";
import { PlaylistCreatePage } from "./playlist/pages/create/playlist-create.page";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { YoutubeService } from "./youtube/services/youtube.service";
import { CommonModule } from "@angular/common";
import { PlaylistSearchPage } from "./playlist/pages/search/playlist-search.page";
import { PlaylistApiService } from "./playlist/shared/playlist-api.service";

export const routes: Routes = [
    { path: "playlist-create", component: PlaylistCreatePage },
    { path: "playlist-search", component: PlaylistSearchPage },
];

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        CommonModule
    ],
    exports: [
        RouterModule,
    ],
    providers: [YoutubeService, PlaylistApiService],
    bootstrap: []
})
export class AppModule { }
