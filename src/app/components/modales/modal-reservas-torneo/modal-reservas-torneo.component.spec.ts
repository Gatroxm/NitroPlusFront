import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservasTorneoComponent } from './modal-reservas-torneo.component';

describe('ModalReservasTorneoComponent', () => {
  let component: ModalReservasTorneoComponent;
  let fixture: ComponentFixture<ModalReservasTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservasTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservasTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
