import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
import { WindowScrolling } from './window-scrolling';

@Directive({
  selector: '[appScrollTrigger]'
})
export class ScrollTriggerDirective {
  private lastScrollPosition = 0;
  margin = 30;

  @Output() scrolledPast = new EventEmitter<any>();
  @Output() scrollFooter = new EventEmitter<any>();

  constructor(
    private element: ElementRef,
    private scroll: WindowScrolling
  ) { }

  private getScreenBottom(): number {
    return this.scroll.getPosition();
  }

  private getElementBottom(): number {
    return this.element.nativeElement.clientHeight + this.element.nativeElement.offsetTop;
  }

  private hasScrolledPastElementBottom(scrollPosition: number): boolean {
    return scrollPosition > this.getElementBottom();
  }

  private hasScrolledPastElementUp(scrollPosition: number): boolean {
    return scrollPosition < this.getElementBottom();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkOffset();
    const currentScrollPosition = this.getScreenBottom();
    const hasScrolledUp = currentScrollPosition < this.lastScrollPosition;
    if (hasScrolledUp) {
      if (this.hasScrolledPastElementUp(currentScrollPosition)) {
        this.scrolledPast.emit({ makeVisible: true });
      }
    } else {
      if (this.hasScrolledPastElementBottom(currentScrollPosition)) {
        this.scrolledPast.emit({ makeVisible: false });
      }
    }
    this.lastScrollPosition = currentScrollPosition;
  }

  checkOffset() {
    if ((document.body.offsetHeight - document.body.scrollTop) <= (window.innerHeight + this.margin)) {
      this.scrollFooter.emit({ footer: false });
    } else {
      this.scrollFooter.emit({ footer: true });
    }
  }
}
