import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayContentComponent } from './play-content.component';

describe('PlayContentComponent', () => {
  let component: PlayContentComponent;
  let fixture: ComponentFixture<PlayContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
