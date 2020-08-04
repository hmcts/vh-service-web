import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocaleResources } from '../../modules/shared/resources/locale-resources';
import { CONFIG } from '../../modules/shared/config';
import { PrintService } from '../../services/print.service';
import { GuidanceModel, GuidanceService } from 'src/app/services/guidance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css']
})
export class GuidanceComponent implements OnInit, AfterViewChecked, OnDestroy {
  localeResources: any;
  contentIndex: Array<GuidanceModel> = [];
  toPrint = false;
  $routerSubcription: Subscription;

  @ViewChild('contentPoint') public contentPoint: ElementRef;

  constructor(private guidanceService: GuidanceService,
    private printService: PrintService,
    private route: ActivatedRoute,
  ) {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.$routerSubcription = this.route.params.subscribe((param) => {
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

  ngOnDestroy() {
    if (this.$routerSubcription) {
      this.$routerSubcription.unsubscribe();
    }
  }
}
