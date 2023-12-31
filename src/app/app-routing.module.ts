import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './youtube/pages/search/search.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YoutubeService } from './youtube/services/youtube.service';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
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
    providers: [YoutubeService],
    bootstrap: []
})
export class AppModule { }
