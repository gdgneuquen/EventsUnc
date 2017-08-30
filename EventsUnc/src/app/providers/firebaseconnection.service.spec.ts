import { TestBed, inject } from '@angular/core/testing';

import { FirebaseconnectionService } from './firebaseconnection.service';

describe('FirebaseconnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseconnectionService]
    });
  });

  it('should be created', inject([FirebaseconnectionService], (service: FirebaseconnectionService) => {
    expect(service).toBeTruthy();
  }));
});
