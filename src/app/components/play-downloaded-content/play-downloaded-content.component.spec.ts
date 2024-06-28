import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDownloadedContentComponent } from './play-downloaded-content.component';

describe('PlayDownloadedContentComponent', () => {
  let component: PlayDownloadedContentComponent;
  let fixture: ComponentFixture<PlayDownloadedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayDownloadedContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayDownloadedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
