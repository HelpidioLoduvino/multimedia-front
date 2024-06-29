import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlbumComponent } from './admin-album.component';

describe('AdminAlbumComponent', () => {
  let component: AdminAlbumComponent;
  let fixture: ComponentFixture<AdminAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
