import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { DatePipe } from '@angular/common';

//import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { isUndefined } from 'util';

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


  patients1: any = [];
  dateTimeList: any = [];

  temperatureList: any[] = [];
  temperatureList1: any = [];
  temperatureList2: any = [];
  tempColor1: any;
  tempColor2: any;

  constructor(private theme: NbThemeService, public datepipe: DatePipe, public db: AngularFireDatabase) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {


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

    });

    firebase.database().ref().on('value', (snap) => {
      snap.forEach((child) => {

        //var dbref = firebase.database().ref("rasp-pi12345/" + child.key).limitToLast(1);
        //console.log(dbref)
        //console.log(child.key)
        //console.log(child.key)
        this.temp.push(child.key)



      });
      //console.log(this.temp)
      //console.log("xxx")
    });

    this.getPatientName();
    this.getPatientCel();

  }

  getPatientName() {

      var i = 0

      this.temp.forEach((patient_name) => {
        firebase.database().ref(patient_name).orderByKey().limitToLast(1).on('value', (snap) => {
          snap.forEach((child) => {

            //var dbref = firebase.database().ref("rasp-pi12345/" + child.key).limitToLast(1);
            //console.log(dbref)
            //console.log(snap.key)
            //console.log(child.key)
            //console.log(child.val().Cel)

            //this.temperatureList.push([child.val().Cel])
            //this.temperatureList[i] = []
            //this.temperatureList[i].push(child.val().Cel)
            //console.log(this.temperatureList[i])

            if(this.temperatureList[i] === undefined){
              this.temperatureList[i] = []
              this.temperatureList[i].push(child.val().Cel)
            }else{
              this.temperatureList[i].push(child.val().Cel)
            }

            //console.log(this.temperatureList)


            //this.temperatureList[i].push(36.0)
            //console.log(this.temperatureList[i].length)
            i++;

          });
        });
      });
      
      console.log(this.temperatureList)
      

    this.timer = setTimeout(() => {
      this.getPatientName();
    }, 5000);
  }

  getPatientCel() {

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



      this.patients1 =
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
        datasets: this.patients1
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


