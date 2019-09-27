import { DetectIPadService } from './detect-i-pad.service';

describe('DetectIPadService', () => {
  const service = new DetectIPadService();
  class Agent {
    userAgent = 'ipad';
  }
  class Agent1 {
    userAgent = 'desktop';
  }

  class Window1 {
    constructor(h, w) {
      this.screen.height = h;
      this.screen.width = w;
    }
    screen = {
      height: 0,
      width: 0
    };
  }

  it('detect iPad return true', () => {
    service._navigator = new Agent();
    service._window = new Window1(1024, 768);
    expect(service.detectiPad()).toBeTruthy();
  });
  it('detect iPad return false', () => {
    service._navigator = new Agent1();
    service._window = new Window1(5024, 768);
    expect(service.detectiPad()).toBeFalsy();
  });
  it('detect iPad if size or model is match iPad', () => {
    service._navigator = new Agent();
    service._window = new Window1(5024, 768);
    expect(service.detectiPad()).toBeTruthy();
  });
});
