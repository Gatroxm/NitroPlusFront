import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaOficialComponent } from './tienda-oficial.component';

describe('TiendaOficialComponent', () => {
  let component: TiendaOficialComponent;
  let fixture: ComponentFixture<TiendaOficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaOficialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
