import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { DatePipe } from '@angular/common';

//import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="information" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy {

  information: any;
  options: any;
  themeSubscription: any;
  dateTime: any;
  timer;

  temp: any = [];
  tempChild: any = [];

  patients: any = [];
  dateTimeList: any = [];

  temperatureList: any[] = [];
  tempColor: any;

  constructor(private theme: NbThemeService, public datepipe: DatePipe, public db: AngularFireDatabase) {
    //loop patient1 from firebase first 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
    firebase.database().ref().on('value', (snap) => {
      var i = 0
      snap.forEach((child) => {
        if (this.temperatureList[i] === undefined) {
          this.temperatureList[i] = []
        }

        this.temp[i] = child.key
        this.tempChild[i] = child.val()


        const mapped = Object.keys(this.tempChild[i]).map(key => ({ value: this.tempChild[i][key].Celcius }));
        this.temperatureList[i].push(mapped[mapped.length - 1].value)

        if(mapped[mapped.length - 1].value >= 37.0){
          this.tempColor = colors.danger;
        }else{
          this.tempColor = colors.primary;
        }

        console.log(this.temperatureList[i])
        if (this.temperatureList[i].length >= 10) {
          this.temperatureList[i].shift();
        }
        i++;



      });
      //update chart
      this.updateChart();
    });
  });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    clearTimeout(this.timer);
  }

  updateChart() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.dateTime = new Date();

      //get patient object
      for (var i = 0; i < this.temp.length; i++) {

        this.patients[i] =
        {
          data: this.temperatureList[i],
          label: this.temp[i],
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor, 0.3),
          borderColor: this.tempColor
        }
      }

      //get date
      this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));

      if (this.dateTimeList.length >= 10) {
        this.dateTimeList.shift();
      }

      console.log(this.patients)
      //assign patient and date to chart
      this.information = {
        labels: this.dateTimeList,
        datasets: this.patients
      };
      
      console.log(this.temperatureList)

    });
  }





}




