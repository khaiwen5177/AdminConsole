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


  patients: any = [];
  dateTimeList: any = [];
  temperatureList1: any = [];
  temperatureList2: any = [];
  tempColor1: any;
  tempColor2: any;

  constructor(private theme: NbThemeService, public datepipe: DatePipe, public db: AngularFireDatabase) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      
      let temp_patient: any = [];
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      /*firebase.database().ref().child("rasp-pi12345/" + "temperature").on('value', (shapshot) => {
        shapshot.forEach((child) => {
          this.temp.push(
            {
              Celcius: child.val().Celcius,
              Fahrenheit: child.val().Fahrenheit
            });
        })
      })*/

      /*firebase.database().ref().child("rasp-pi12345/").on('value', (shapshot) => {
        shapshot.forEach((child) => {
          this.temp.push(
            {
              info: child.val(),
            });
        })
      })*/

      /*var rootRef = firebase.database().ref();
      var urlRef = rootRef.child("Patient1");
      rootRef.once("value", function (snapshot) {

      });*/

      /*var rootRef = firebase.database().ref();
      var urlRef = rootRef.child("user1/DAA Notes/URL");
      urlRef.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          console.log(child.key + ": " + child.val());
        });
      });*/

      /*DatabaseReference ref = users.child("GTjrWgpKjoeXUt4JdBJTYP1JkVT2/fnBOM...`");
      ref.orderByKey().limitToLast(1).addChildEventListener(...*/

      firebase.database().ref().on('value', (snap) => {
        snap.forEach((child) => {

          //var dbref = firebase.database().ref("rasp-pi12345/" + child.key).limitToLast(1);
          //console.log(dbref)

          this.temp.push(
            {
              patient_name: child.key,
              date: child.val(),
            });
        });

        let i = 0;

        this.temp.forEach(function (value1) {

          let info: any = {};
          info.label = value1.patient_name;
          info.data = [];

          console.log(info.label);
          //console.log(value1.patient_name);
          //let temp_temperatureList = value1.date[Object.keys(value1.date)[4]];
          let temp_temperatureList = value1.date;
          //console.log(Object.keys(temp_temperatureList).length);
          //console.log(Object.values(temp_temperatureList).length);
          console.log(Object.values(temp_temperatureList));
          //console.log(value1.date[Object.keys(value1.date)[0]]);
          //console.log(value1.date);

          Object.values(temp_temperatureList).forEach(function (value2) {
            //console.log(temp_temperatureList.length)
            var iterator = Object.values(value2).values();
            for (let celcius of iterator) {
            info.data.push(celcius)
            console.log(info.data); 
           } 
          });

          /*console.log(info.data.length);
          while(info.data.length !== 1){
            info.data.shift()
          }
          console.log(info.data.length);
          console.log("im here: " + info.data); */

          info.backgroundColor = NbColorHelper.hexToRgbA(colors.primary, 0.3)
          info.borderColor = colors.primary
          temp_patient.push(info);
          console.log(temp_patient);
        });

        /*this.patients =
        [{
          data: this.temperatureList1,
          label: 'Kelvin',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: this.temperatureList2,
          label: 'James',
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor2, 0.3),
          borderColor: this.tempColor2,
        }]*/

      });




      /*for (let i = 0; i < this.temp.lenght; i++) {
        this.temp_patient
      }*/



      //console.log(firebase.database().ref().child)
      /*console.log(this.temp);

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;*/

      /*this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: [28, 48, 40, 19, 86, 27, 90],
          label: 'Series B',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: [18, 48, 77, 9, 100, 27, 40],
          label: 'Series C',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
        },
        ],
      };*/

      /*this.dateTime = new Date();
      this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));

      if(this.temperatureList1.length < 6){
        this.temperatureList1.push(this.genRand(35.5, 38.5, 1))
      }else{
        this.dateTimeList.shift()
        this.temperatureList2.shift()
        this.temperatureList1.push(this.genRand(35.5, 38.5, 1))
      }

      //this.temperatureList1.push(this.genRand(35.5, 38.5, 1))

      if (this.temperatureList1[this.temperatureList1.length - 1] < 37.5) {
        this.tempColor1 = colors.primary;
      } else {
        this.tempColor1 = colors.danger;
      }

      if(this.temperatureList2.length < 6){
        this.temperatureList2.push(this.genRand(35.5, 38.5, 1))
      }else{
        this.dateTimeList.shift()
        this.temperatureList2.shift()
        this.temperatureList2.push(this.genRand(35.5, 38.5, 1))
      }

      if (this.temperatureList2[this.temperatureList1.length - 1] < 37.5) {
        this.tempColor2 = colors.primary;
      } else {
        this.tempColor2 = colors.danger;
      }

      this.patients =
        [{
          data: this.temperatureList1,
          label: 'Kelvin',
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor1, 0.3),
          borderColor: this.tempColor1,
        }, {
          data: this.temperatureList2,
          label: 'James',
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor2, 0.3),
          borderColor: this.tempColor2,
        }]

      this.information = {
        labels: this.dateTimeList,
        datasets: this.patients
      }; */

      /*this.information = [
        {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40, 100],
          label: 'Kelvin',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        },
        ],
      },
      {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [{
          data: [28, 48, 40, 19, 86, 27, 90, 100],
          label: 'James',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        },
        ],
      },
    ]*/

      /*  this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };*/
      this.updateRecursive();
    });

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    clearTimeout(this.timer);
  }

  genRand(min, max, decimalPlaces) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  }

  updateRecursive() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.dateTime = new Date();

      if (this.temperatureList1.length < 10) {
        this.temperatureList1.push(this.genRand(35.5, 38.5, 1))
        this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));
      } else {
        this.dateTimeList.shift()
        this.temperatureList1.shift()
        this.temperatureList1.push(this.genRand(35.5, 38.5, 1))
        this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));
      }

      if (this.temperatureList1[this.temperatureList1.length - 1] < 37.5) {
        this.tempColor1 = colors.primary;
      } else {
        this.tempColor1 = colors.danger;
      }

      if (this.temperatureList2.length < 10) {
        this.temperatureList2.push(this.genRand(35.5, 38.5, 1))
      } else {
        this.dateTimeList.shift()
        this.temperatureList2.shift()
        this.temperatureList2.push(this.genRand(35.5, 38.5, 1))
        this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));
      }

      if (this.temperatureList2[this.temperatureList1.length - 1] < 37.5) {
        this.tempColor2 = colors.primary;
      } else {
        this.tempColor2 = colors.danger;
      }



      this.patients =
        [{
          data: this.temperatureList1,
          label: 'Kelvin',
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor1, 0.3),
          borderColor: this.tempColor1,
        }, {
          data: this.temperatureList2,
          label: 'James',
          backgroundColor: NbColorHelper.hexToRgbA(this.tempColor2, 0.3),
          borderColor: this.tempColor2,
        }]

      this.information = {
        labels: this.dateTimeList,
        datasets: this.patients
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });

    this.timer = setTimeout(() => {
      this.updateRecursive();
    }, 5000);
  }



}


