import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailShoppingComponent } from './client-detail-shopping.component';

describe('ClientDetailShoppingComponent', () => {
  let component: ClientDetailShoppingComponent;
  let fixture: ComponentFixture<ClientDetailShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
