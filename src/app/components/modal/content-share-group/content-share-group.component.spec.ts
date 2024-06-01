import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentShareGroupComponent } from './content-share-group.component';

describe('ContentShareGroupComponent', () => {
  let component: ContentShareGroupComponent;
  let fixture: ComponentFixture<ContentShareGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentShareGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentShareGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
