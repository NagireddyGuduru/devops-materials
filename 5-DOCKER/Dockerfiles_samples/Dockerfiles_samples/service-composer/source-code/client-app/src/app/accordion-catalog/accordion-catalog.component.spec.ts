import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionCatalogComponent } from './accordion-catalog.component';

describe('AccordionCatalogComponent', () => {
  let component: AccordionCatalogComponent;
  let fixture: ComponentFixture<AccordionCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
