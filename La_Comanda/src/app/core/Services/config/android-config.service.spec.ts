import { TestBed } from '@angular/core/testing';

import { AndroidConfigService } from './android-config.service';

describe('AndroidConfigService', () => {
  let service: AndroidConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AndroidConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
