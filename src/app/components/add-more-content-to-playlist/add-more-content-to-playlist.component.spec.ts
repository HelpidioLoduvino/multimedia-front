import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreContentToPlaylistComponent } from './add-more-content-to-playlist.component';

describe('AddMoreContentToPlaylistComponent', () => {
  let component: AddMoreContentToPlaylistComponent;
  let fixture: ComponentFixture<AddMoreContentToPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMoreContentToPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMoreContentToPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
