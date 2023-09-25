import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCerradosComponent } from './reportes-cerrados.component';

describe('ReportesCerradosComponent', () => {
  let component: ReportesCerradosComponent;
  let fixture: ComponentFixture<ReportesCerradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesCerradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesCerradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
