import { Component } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  standalone: true,
  providers: [YoutubeService],
  templateUrl: './search.page.html',
})
export class SearchComponent {
  query = '';
  videos: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  async search() {
    this.videos = await this.youtubeService.searchVideos(this.query);
  }
}
