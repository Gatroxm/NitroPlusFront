import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTorneoComponent } from './modal-torneo.component';

describe('ModalTorneoComponent', () => {
  let component: ModalTorneoComponent;
  let fixture: ComponentFixture<ModalTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
