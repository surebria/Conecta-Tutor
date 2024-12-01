import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTutorComponent } from './perfil-tutor.component';

describe('PerfilTutorComponent', () => {
  let component: PerfilTutorComponent;
  let fixture: ComponentFixture<PerfilTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
