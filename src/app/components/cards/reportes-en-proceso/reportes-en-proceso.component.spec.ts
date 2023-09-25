import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEnProcesoComponent } from './reportes-en-proceso.component';

describe('ReportesEnProcesoComponent', () => {
  let component: ReportesEnProcesoComponent;
  let fixture: ComponentFixture<ReportesEnProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEnProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
