import { WindowScrolling } from './window-scrolling';
import { ElementRef } from '@angular/core';
import { ScrollTriggerDirective } from './scroll-trigger.directive';

describe('ScrollableDirective', () => {
  let elementRef: ElementRef;
  let nativeElement: any;
  let directive: ScrollTriggerDirective;
  let windowScroll: jasmine.SpyObj<WindowScrolling>;
  let eventRaised = false;
  let eventRaisedFooter = false;
  const documentHeight = 500;

  beforeEach(() => {
    windowScroll = jasmine.createSpyObj<WindowScrolling>(['getWindowHeight', 'getPosition', 'getScreenBottom']);
    windowScroll.getWindowHeight.and.returnValue(documentHeight);
    windowScroll.getScreenBottom.and.callFake(() => documentHeight + windowScroll.getPosition());
    nativeElement = {
      clientHeight: 300,
      offsetTop: 100
    };
    elementRef = {
      nativeElement: nativeElement
    };
    directive = new ScrollTriggerDirective(elementRef, windowScroll);
    directive.scrolledPast.subscribe((e) => eventRaised = true);
    directive.scrollFooter.subscribe((e) => eventRaisedFooter = true);
  });

  const getElementBottom = (): number => {
    return nativeElement.clientHeight + nativeElement.offsetTop;
  };

  const scrollPastElementBottom = () => {
    const pos = getElementBottom() + documentHeight;
    windowScroll.getPosition.and.returnValue(pos);
    directive.onWindowScroll();
  };

  const scrollToAboveBottom = () => {
    const pos = getElementBottom();
    windowScroll.getPosition.and.returnValue(pos);
    directive.onWindowScroll();
  };

  it('should raise event if reached bottom of element', () => {
    scrollPastElementBottom();
    expect(eventRaised).toBe(true);
  });

  it('should raise event if reached bottom of element, scrolling up then down again', () => {
    scrollPastElementBottom();
    expect(eventRaised).toBe(true);

    eventRaised = false;
    scrollToAboveBottom();
    expect(eventRaised).toBe(false);

    scrollPastElementBottom();
    expect(eventRaised).toBe(true);
  });

});
