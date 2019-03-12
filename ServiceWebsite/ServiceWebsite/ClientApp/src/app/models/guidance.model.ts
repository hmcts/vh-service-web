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
