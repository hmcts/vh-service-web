import { DetectIPadService } from './detect-i-pad.service';

describe('DetectIPadService', () => {
  const service = new DetectIPadService();
  class Agent {
    userAgent = 'ipad';
  }
  class Agent1 {
    userAgent = 'desktop';
  }

  it('detect iPad return true', () => {
    service._navigator = new Agent();
    expect(service.detectiPad()).toBeTruthy();
  });
  it('detect iPad return false', () => {
    service._navigator = new Agent1();
    expect(service.detectiPad()).toBeFalsy();
  });
});
