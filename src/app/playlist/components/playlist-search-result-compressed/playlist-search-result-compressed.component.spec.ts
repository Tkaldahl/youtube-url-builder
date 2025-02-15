import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSearchResultCompressedComponent } from './playlist-search-result-compressed.component';

describe('PlaylistSearchResultCompressedComponent', () => {
  let component: PlaylistSearchResultCompressedComponent;
  let fixture: ComponentFixture<PlaylistSearchResultCompressedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistSearchResultCompressedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistSearchResultCompressedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // Can I feed a playlist into this and confirm that it has values?
  });
});
