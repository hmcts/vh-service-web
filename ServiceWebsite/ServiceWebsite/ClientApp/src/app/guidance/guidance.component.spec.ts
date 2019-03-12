import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuidanceComponent } from './guidance.component';
import { GuidanceService } from './guidance.service';
import { PrintService } from '../services/print.service';
import { ActivatedRoute, Params } from '@angular/router';

describe('GuidanceComponent', () => {
  let component: GuidanceComponent;
  let fixture: ComponentFixture<GuidanceComponent>;
  let printServiceSpy: jasmine.SpyObj<PrintService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GuidanceComponent,
      ],
      providers: [
        GuidanceService,
        { provide: PrintService, useValue: printServiceSpy },
        { provide: ActivatedRoute, useValue: { params: { subscribe: (fh: (value: Params) => void) => fh({ print: false})  } } }
      ]
    })
      .compileComponents();
  }));

  printServiceSpy = jasmine.createSpyObj<PrintService>('PrintService', ['printPage']);

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create guidance component', () => {
    expect(component).toBeTruthy();
  });
  it('should set flag toPrint to false', () => {
    expect(component.toPrint).toBeFalsy();
  });
  it('should provide contents to render', () => {
    component.ngOnInit();
    expect(component.contentIndex).toBeTruthy();
    expect(component.contentIndex.length).toBeGreaterThan(0);
  });
  it('should set first item of contents to active', () => {
    component.ngOnInit();
    expect(component.contentIndex[0].IsActive).toBeTruthy();
  });
  it('should set an item of contents to active if its content index was clicked', () => {
    component.ngOnInit();
    component.showSection(2);
    expect(component.contentIndex[1].IsActive).toBeTruthy();
  });
});
