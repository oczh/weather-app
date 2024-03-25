import { TestBed } from '@angular/core/testing';

import { RequestRxService } from './request-rx.service';

describe('RequestRxService', () => {
  let service: RequestRxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
