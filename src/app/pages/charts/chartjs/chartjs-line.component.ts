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
  tempCount: any = 0;
  checkSuccess: any = 0;

  temp: any = [];

  patients: any = [];
  patients1: any = [];
  dateTimeList: any = [];

  temperatureList: any[] = [];
  temperatureList1: any = [];
  temperatureList2: any = [];
  tempColor: any;
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

    //this.updateRecursive();
    this.getPatientName();
   

  }



  getPatientName() {

    //console.log(this.temp)
    //var i = 0

    //this.temp.forEach((patient_name) => {
    for(var i = 0; i < this.temp.length ; i++) { 
      firebase.database().ref(this.temp[i]).orderByKey().limitToLast(1).on('value', (snap) => {
        snap.forEach((child) => {

          if (this.temperatureList[i] === undefined) {
            this.temperatureList[i] = []
            this.temperatureList[i].push(child.val().Cel)
          } else {
            this.temperatureList[i].push(child.val().Cel)
            //console.log(this.temperatureList[i].length)
            if (this.temperatureList[i].length > 10) {
              this.temperatureList[i].shift()
            }
          }

          

          //i++;

        });
      });
    //});
    }


    console.log(this.temperatureList)

      this.updateChart()

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

      console.log(this.temp)
      var i = 0

      this.temp.forEach((patient_name) => {
        firebase.database().ref(patient_name).orderByKey().limitToLast(1).on('value', (snap) => {
          snap.forEach((child) => {

            console.log(patient_name)
            console.log(i)
            
            if (this.temperatureList[i] === undefined) {
              this.temperatureList[i] = []
              this.temperatureList[i].push(child.val().Cel)
            } else {
              this.temperatureList[i].push(child.val().Cel)
              if (this.temperatureList[i].length > 10) {
                this.temperatureList[i].shift()
              }
            }



            /*if (this.temperatureList[this.temperatureList.length - 1] < 37.5) {
              this.tempColor = colors.primary;
            } else {
              this.tempColor = colors.danger;
            }*/
            //onsole.log(this.temp[i])
            
            this.patients[i] =
            {
              data: this.temperatureList[i],
              label: this.temp[i],
              backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
              borderColor: colors.primary
            }
            //console.log(this.patients[i])
            i++;

          });
        });
      });

      

      this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));
      if(this.tempCount === 0){
        this.dateTimeList.shift()
        this.tempCount = this.tempCount + 1
      }
      else{
        if(this.dateTimeList.length > 10){
          this.dateTimeList.shift(); 
        }
      }


      this.information = {
        labels: this.dateTimeList,
        datasets: this.patients
      };
      
      //console.log(this.patients)
      //console.log(this.temperatureList)

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
  
  updateChart(){
    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.dateTime = new Date();

      //var i = 0

      for(var i = 0; i < this.temp.length; i++ ){
        //console.log("hi" + i)
        this.patients[i] =
        {
          data: this.temperatureList[i],
          label: this.temp[i],
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary
        }
      }


      this.dateTimeList.push(this.datepipe.transform(this.dateTime, 'hh:mm:ss aa'));
      if(this.tempCount === 0){
        this.dateTimeList.shift()
        this.tempCount = this.tempCount + 1
      }
      else{
        if(this.dateTimeList.length > 10){
          this.dateTimeList.shift(); 
        }
      }


      this.information = {
        labels: this.dateTimeList,
        datasets: this.patients
      };
      
      //console.log(this.patients)
      console.log(this.temperatureList)


    });
    this.timer = setTimeout(() => {
      this.getPatientName()
    }, 5000);
  }

 



}




