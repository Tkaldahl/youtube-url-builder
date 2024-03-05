import { RouterModule, Routes } from "@angular/router";
import { PlaylistEditPage } from "./playlist/pages/edit/playlist-edit.page";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { YoutubeService } from "./youtube/services/youtube.service";
import { CommonModule } from "@angular/common";
import { PlaylistSearchPage } from "./playlist/pages/search/playlist-search.page";
import { PlaylistApiService } from "./playlist/shared/services/playlist-api.service";
import {FormsModule} from "@angular/forms";
import { playlistResolver } from "./playlist/shared/services/playlist-resolvers";

export const routes: Routes = [
  {
    path: "playlist/:playlistId",
    component: PlaylistEditPage,
    resolve: {
      playlistResolverRes: playlistResolver
    }
  },
  {
    path: "playlist-search",
    component: PlaylistSearchPage
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [YoutubeService, PlaylistApiService],
  bootstrap: []
})
export class AppModule { }
