import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPendientesLideresComponent } from './reportes-pendientes-lideres.component';

describe('ReportesPendientesLideresComponent', () => {
  let component: ReportesPendientesLideresComponent;
  let fixture: ComponentFixture<ReportesPendientesLideresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesPendientesLideresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesPendientesLideresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
