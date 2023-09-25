import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComoobtenerLicenciasComponent } from './modal-comoobtener-licencias.component';

describe('ModalComoobtenerLicenciasComponent', () => {
  let component: ModalComoobtenerLicenciasComponent;
  let fixture: ComponentFixture<ModalComoobtenerLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComoobtenerLicenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComoobtenerLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
