import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingClientComponent } from './shoping-client.component';

describe('ShopingClientComponent', () => {
  let component: ShopingClientComponent;
  let fixture: ComponentFixture<ShopingClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopingClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
