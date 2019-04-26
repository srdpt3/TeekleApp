import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private _backendService : BackendService) { }

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  myData;

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.dataLoading = true;
    this.querySubscription = this._backendService.getData().subscribe((res) => {
      console.log("Asdfasdfasdfasfasf");
      console.log(res["bpi"]);

     // console.log(JSON.parse(JSON.stringify(res['bpi']['USD'])));

      
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "ssss";
          this.dataLoading = false;
        //  console.log(res["bpi"]);
          this.myData= res["data"];
      

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
  ngOnDestroy(){
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
  }
}