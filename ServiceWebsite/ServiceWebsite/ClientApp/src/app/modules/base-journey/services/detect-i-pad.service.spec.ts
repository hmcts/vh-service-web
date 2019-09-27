import { DetectIPadService } from './detect-i-pad.service';

describe('DetectIPadService', () => {
  const service = new DetectIPadService();
  class agent {
    userAgent = 'ipad';
  }
  class agent1 {
    userAgent = 'desktop';
  }

  class window1 {
    constructor(h, w) {
      this.screen.height = h;
      this.screen.width = w;
    }
    screen = {
      height: 0,
      width: 0
    }
  }
 
  it('detect iPad return true', () => {
    service._navigator = new agent();
    service._window = new window1(1024, 768);
    expect(service.detectiPad()).toBeTruthy();
  })
  it('detect iPad return false', () => {
    service._navigator = new agent1();
    service._window = new window1(5024, 768);
    expect(service.detectiPad()).toBeFalsy();
  })
  it('detect iPad if size or model is match iPad', () => {
    service._navigator = new agent();
    service._window = new window1(5024, 768);
    expect(service.detectiPad()).toBeTruthy();
  })
});
