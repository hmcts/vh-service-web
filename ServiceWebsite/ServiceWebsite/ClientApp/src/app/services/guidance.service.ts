import { Injectable } from '@angular/core';
import { LocaleResources } from '../modules/shared/resources/locale-resources';
import { CONFIG } from '../modules/shared/config';

export class GuidanceModel {

  constructor(content: string, contentText: Array<string>) {
    this.IsActive = false;
    this.Name = content;
    this.ContentText = contentText;
    this.ListTitle = '';
    this.ListItems = [];
  }

  Index: number;
  Name: string;
  IsActive: boolean;
  ContentText: Array<string>;
  ListTitle: string;
  ListItems: Array<string>;
}

@Injectable()
export class GuidanceService {
  localeResources: any;
  contentIndex: Array<GuidanceModel> = [];

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  getGuidanceContents(): Array<GuidanceModel> {
    const contents = this.localeResources.Guidance.ContentIndex.map(s => this.mapToModel(s));
    contents.forEach(s => this.contentIndex.push(s));
    return this.contentIndex;
  }

  mapToModel(content: any) {
    const model = new GuidanceModel(content.Content, content.Text);
    model.Index = content.Index;
    model.IsActive = model.Index === 1;
    if (content.ListTitle) {
      model.ListTitle = content.ListTitle;
      model.ListItems = content.List;
    }
    return model;
  }
}
