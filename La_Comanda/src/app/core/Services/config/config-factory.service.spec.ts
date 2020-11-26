import { TestBed } from '@angular/core/testing';

import { ConfigFactoryService } from './config-factory.service';

describe('ConfigFactoryService', () => {
  let service: ConfigFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
