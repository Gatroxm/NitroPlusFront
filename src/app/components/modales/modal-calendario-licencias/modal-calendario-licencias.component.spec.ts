import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarioLicenciasComponent } from './modal-calendario-licencias.component';

describe('ModalCalendarioLicenciasComponent', () => {
  let component: ModalCalendarioLicenciasComponent;
  let fixture: ComponentFixture<ModalCalendarioLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCalendarioLicenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCalendarioLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
