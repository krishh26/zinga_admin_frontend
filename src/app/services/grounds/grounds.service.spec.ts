/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroundsService } from './grounds.service';

describe('Service: Grounds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroundsService]
    });
  });

  it('should ...', inject([GroundsService], (service: GroundsService) => {
    expect(service).toBeTruthy();
  }));
});
