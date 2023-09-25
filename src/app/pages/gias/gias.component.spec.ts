import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiasComponent } from './gias.component';

describe('GiasComponent', () => {
  let component: GiasComponent;
  let fixture: ComponentFixture<GiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
