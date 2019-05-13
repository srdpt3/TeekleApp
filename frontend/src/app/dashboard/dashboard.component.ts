import { CoinpriceService } from './../services/coinprice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  chart = [];
  constructor(private _backendService: BackendService, private _coinService: BackendService) { }

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  myData;

  ngOnInit() {
    this.getData();
  }

  // ngOnInit() {
  //   this._coinService.dailyForecast()
  //     .subscribe(res => {
  //       // console.log( res['bpi'])
  //       // let temp_max = res['list'].map(res => res.main.temp_max);
  //       // let temp_min = res['list'].map(res => res.main.temp_min);
  //       let alldates = res['bpi']

  //       let weatherDates = []
  //       let coin_data = []

  //       for (let [key, value] of Object.entries(alldates)) {
  //         // console.log(key, value);
  //         coin_data.push(value)

  //         let jsdate = new Date(key)
  //         console.log(jsdate);
  //         weatherDates.push(key);
  //         // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
  //       }

  //       // alldates.forEach((res) => {
  //       //   console.log(res);

  //       //   // let jsdate = new Date(res * 1000)
  //       //   // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
  //       // });
  //       this.chart = new Chart('canvas', {
  //         type: 'line',

  //         data: {
  //           labels: weatherDates,
  //           datasets: [
  //             {
  //               data: coin_data,
  //               borderColor: "#3cba9f",
  //               fill: false
  //             },
  //             // {
  //             //   data: temp_min,
  //             //   borderColor: "#ffcc00",
  //             //   fill: false
  //             // },
  //           ]
  //         },
  //         options: {
  //           legend: {
  //             display: false
  //           },

  //           title: {
  //             display: true,
  //             fontSize: 15,
  //             color: "#3cba9f",
  //             text: '나의 포트폴리오 퍼포먼스'
  //           },
  //           scales: {
  //             xAxes: [{
  //               display: false
  //             }],
  //             yAxes: [{
  //               display: true,

  //            }],
  //           }
  //         }
  //       });


  //     });
  // }





  getData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getData().subscribe((res) => {
      console.log("Asdfasdfasf");
      let alldates = res.bpi

      let coinDataArray = []
      let coin_data = []

      for (let [key, value] of Object.entries(alldates)) {
        // console.log(key, value);
        coin_data.push(value)

        let jsdate = new Date(key)
        console.log(jsdate);
        coinDataArray.push(key);
        // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      }

      // alldates.forEach((res) => {
      //   console.log(res);

      //   // let jsdate = new Date(res * 1000)
      //   // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      // });
      this.chart = new Chart('canvas', {
        type: 'line',

        data: {
          labels: coinDataArray,
          datasets: [
            {
              data: coin_data,
              borderColor: "#3cba9f",
              fill: false
            },
            // {
            //   data: temp_min,
            //   borderColor: "#ffcc00",
            //   fill: false
            // },
          ]
        },
        options: {
          legend: {
            display: false
          },

          title: {
            display: true,
            fontSize: 15,
            color: "#3cba9f",
            text: '나의 포트폴리오 퍼포먼스'
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: true,

            }],
          }
        }
      });
      // console.log(JSON.parse(JSON.stringify(res['bpi']['USD'])));


      if (res["errorCode"] > 0) {
        this.error = false;
        this.errorMessage = "ssss";
        this.dataLoading = false;
        //  console.log(res["bpi"]);
        this.myData = res.bpi;




      } else {
        this.error = true;
        this.errorMessage = res["errorMessage"];
        this.dataLoading = false;

      }
    },
      (error) => {

        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.dataLoading = false;
      });
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}