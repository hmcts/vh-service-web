export class CheckEquipmentModel {
  constructor(title: string, key: string) {
    this.checkTitle = title;
    this.checkKey = key;
    this.checkValue = 0;
  }
  checkTitle: string;
  checkResult: string;
  checkValue: number;
  checkError: string;
  checkKey: string;
}
