import { TestBed } from '@angular/core/testing';

import { SearchCenterService } from './search-center.service';

describe('SearchCenterService', () => {
  let service: SearchCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
