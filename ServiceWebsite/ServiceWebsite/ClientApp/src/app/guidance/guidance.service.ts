import { Injectable } from '@angular/core';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';
import { GuidanceModel } from '../models/guidance.model';


@Injectable()
export class GuidanceService {
  localeResources: any;
  contentIndex: Array<GuidanceModel> = [];

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  getGuidanceContents(): Array<GuidanceModel> {
    let contents = this.localeResources.Guidance.ContentIndex.map(s => this.mapToModel(s));
    contents.forEach(s => this.contentIndex.push(s));
    return this.contentIndex;
  }

  mapToModel(content: any) {
    let model = new GuidanceModel(content.Content, content.Text);
    model.Index = content.Index;
    model.IsActive = model.Index == 1;
    if (content.ListTitle) {
      model.ListTitle = content.ListTitle;
      model.ListItems = content.List;
    }
    return model;
  }
}
