import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsComponent {

  dateTime: any;

  constructor(public datepipe: DatePipe) {
    this.dateTime = this.datepipe.transform(new Date(), 'yyyy/MM/dd')
  }
}
