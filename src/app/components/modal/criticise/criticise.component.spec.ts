import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticiseComponent } from './criticise.component';

describe('CriticiseComponent', () => {
  let component: CriticiseComponent;
  let fixture: ComponentFixture<CriticiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriticiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
