import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar-basic',
  templateUrl: './progressbar-basic.component.html',
  styleUrls: ['./progressbar-basic.component.css']
})
export class ProgressbarBasicComponent implements OnInit {
  @Input()
  checkValue: number = 0;

  @Input()
  checkTitle: string;

  @Input()
  checkResult: string;

  @Input()
  checkError: string;

  ngOnInit() { }
}
