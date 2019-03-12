import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ProgressbarBasicComponent } from './progressbar-basic.component';

describe('ProgressbarBasicComponent', () => {
  @Component({ selector: 'ngb-progressbar', template: '' })
  class ProgressBarStub {
    @Input()
    value: number;
  }

  let debugElement: DebugElement;
  let fixture: ComponentFixture<ProgressbarBasicComponent>;
  let componentUnderTest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressbarBasicComponent, ProgressBarStub],
      providers: [
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ProgressbarBasicComponent);
    debugElement = fixture.debugElement;
    componentUnderTest = debugElement.componentInstance;

    fixture.detectChanges();
  }));


  it('should create ProgressbarBasicComponent', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should display result', async(() => {
    componentUnderTest.checkTitle = 'Internet';
    componentUnderTest.checkResult = '25Mbs';

    fixture.whenStable().then(
      () => {
        fixture.detectChanges();
        const element = debugElement.query(By.css('#check-equpment-result'));
        expect(element.nativeElement.innerHTML).toEqual('25Mbs');
        const elementError = debugElement.query(By.css('#result-error'));
        expect(elementError).toBeFalsy();
      });
  }));

  it('should display error', async(() => {
    componentUnderTest.checkTitle = 'Device';
    componentUnderTest.checkResult = 'Mobile';
    componentUnderTest.checkError = 'error device';

    fixture.whenStable().then(
      () => {
        fixture.detectChanges();
        const element = debugElement.query(By.css('#check-equpment-result-error'));
        expect(element.nativeElement.innerHTML).toContain('Mobile');
        const elementError = debugElement.query(By.css('#result-error'));
        expect(elementError).toBeTruthy();
      });
  }));
});
