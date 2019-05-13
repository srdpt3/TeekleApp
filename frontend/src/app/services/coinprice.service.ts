import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoinpriceService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-05-01&end=2019-05-30").pipe(map(response => response));



  }
}
