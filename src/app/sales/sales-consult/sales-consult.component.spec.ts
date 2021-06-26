import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesConsultComponent } from './sales-consult.component';

describe('SalesConsultComponent', () => {
  let component: SalesConsultComponent;
  let fixture: ComponentFixture<SalesConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
