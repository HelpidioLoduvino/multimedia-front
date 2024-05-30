import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsComponent } from './playlists.component';

describe('PlaylistComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
