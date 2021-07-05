import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleConsultDetailComponent } from './sale-consult-detail.component';

describe('SaleConsultDetailComponent', () => {
  let component: SaleConsultDetailComponent;
  let fixture: ComponentFixture<SaleConsultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleConsultDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleConsultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
