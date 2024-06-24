import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentToGroupComponent } from './add-content-to-group.component';

describe('AddContentToGroupComponent', () => {
  let component: AddContentToGroupComponent;
  let fixture: ComponentFixture<AddContentToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContentToGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContentToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
