import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoTorneoComponent } from './modal-info-torneo.component';

describe('ModalInfoTorneoComponent', () => {
  let component: ModalInfoTorneoComponent;
  let fixture: ComponentFixture<ModalInfoTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
