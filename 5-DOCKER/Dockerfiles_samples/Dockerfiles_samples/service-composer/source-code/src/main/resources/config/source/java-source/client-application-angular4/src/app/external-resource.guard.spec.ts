import { TestBed, async, inject } from '@angular/core/testing';

import { ExternalResourceGuard } from './external-resource.guard';

describe('ExternalResourceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalResourceGuard]
    });
  });

  it('should ...', inject([ExternalResourceGuard], (guard: ExternalResourceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
