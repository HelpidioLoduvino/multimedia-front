import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToEnterComponent } from './request-to-enter.component';

describe('RequestToEnterComponent', () => {
  let component: RequestToEnterComponent;
  let fixture: ComponentFixture<RequestToEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestToEnterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestToEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
