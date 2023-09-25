import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPendientesComponent } from './reportes-pendientes.component';

describe('ReportesPendientesComponent', () => {
  let component: ReportesPendientesComponent;
  let fixture: ComponentFixture<ReportesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesPendientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
