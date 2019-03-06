import { TestBed, inject } from '@angular/core/testing';
import { GuidanceService } from './guidance.service';

describe('GuidanceService', () => {

  let guidanceService: GuidanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GuidanceService,
      ]
    });

    guidanceService = TestBed.get(GuidanceService);
  });

  it('should be created', inject([GuidanceService], (service: GuidanceService) => {
    expect(service).toBeTruthy();
  }));

  it('gets the guidance contents', () => {
    let contents = guidanceService.getGuidanceContents();
    expect(contents).toBeTruthy();
    expect(contents[0].Index).toEqual(1);
    expect(contents[0].Name.length).toBeGreaterThan(1);
    expect(contents[0].IsActive).toBeFalsy;
  });
});
