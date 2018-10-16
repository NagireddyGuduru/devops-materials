import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCatalogComponent } from './cards-catalog.component';

describe('CardsCatalogComponent', () => {
  let component: CardsCatalogComponent;
  let fixture: ComponentFixture<CardsCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
