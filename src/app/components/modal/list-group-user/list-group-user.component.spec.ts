import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupUserComponent } from './list-group-user.component';

describe('ListGroupUserComponent', () => {
  let component: ListGroupUserComponent;
  let fixture: ComponentFixture<ListGroupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroupUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
