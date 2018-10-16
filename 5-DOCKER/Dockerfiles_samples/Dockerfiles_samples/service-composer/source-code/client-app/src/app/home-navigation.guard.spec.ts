import { TestBed, async, inject } from '@angular/core/testing';

import { HomeNavigationGuard } from './home-navigation.guard';

describe('HomeNavigationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeNavigationGuard]
    });
  });

  it('should ...', inject([HomeNavigationGuard], (guard: HomeNavigationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
