import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIsncribeteTorneoComponent } from './modal-isncribete-torneo.component';

describe('ModalIsncribeteTorneoComponent', () => {
  let component: ModalIsncribeteTorneoComponent;
  let fixture: ComponentFixture<ModalIsncribeteTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIsncribeteTorneoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIsncribeteTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
