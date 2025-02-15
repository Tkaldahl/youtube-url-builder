import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDoc } from '../../shared/models/playlist.models';

@Component({
  selector: 'app-playlist-search-result-compressed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-search-result-compressed.component.html',
  styleUrl: './playlist-search-result-compressed.component.scss'
})
export class PlaylistSearchResultCompressedComponent {
    @Input() playlistDoc!: PlaylistDoc;

    

}
