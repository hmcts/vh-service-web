import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';
import { GuidanceModel } from '../models/guidance.model';
import { GuidanceService } from './guidance.service';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css']
})
export class GuidanceComponent implements OnInit, AfterViewChecked {
  localeResources: any;
  contentIndex: Array<GuidanceModel> = [];
  toPrint = false;

  @ViewChild('contentPoint') public contentPoint: ElementRef;

  constructor(private guidanceService: GuidanceService,
    private printService: PrintService,
    private route: ActivatedRoute,
  ) {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.route.params.subscribe((param) => {
      this.toPrint = param['print'];
    });
  }

  ngOnInit() {
    this.contentIndex = this.guidanceService.getGuidanceContents();
  }

  ngAfterViewChecked() {
    if (this.toPrint) {
      this.printService.printPage('printDoc');
    }
  }

  showSection(index) {
    for (const cindex of this.contentIndex) {
      cindex.IsActive = cindex.Index === index;
    }
    this.contentPoint.nativeElement.scrollIntoView(false);
  }
}
