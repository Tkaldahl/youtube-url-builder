import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './youtube/search/search.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YoutubeService } from './youtube/youtube.service';
import { CommonModule } from '@angular/common';
// import { AppRoutingModule } from './app-routing.module'; // Add this import

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
