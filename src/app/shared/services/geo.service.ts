import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  coords: Array<any> = new Array(); 

  constructor(
    private http: HttpClient,
    private readonly geolocation: GeolocationService) { }
  
  coordenadas = {
    lat: '',
    long: ''
  }

  getCoord(country: string, city: string, postalCode: string, street: string, number: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders()
    }

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const apiKey: string = 'b5929af5bf654da480a1226d548a79f1'

    const url = 'https://api.geoapify.com/v1/geocode/search?text=' +  country + ' ' + city + ' ' + postalCode + ' ' + street + ' ' + number + '&apiKey=' + apiKey;

    return this.http.get<any>(url, httpOptions);
  }

  getPosition(): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this.geolocation.subscribe(position => {
        this.coords.push(position.coords.latitude, position.coords.longitude);
        resolve(this.coords);
      },
      err => {
        reject()
      })
    })
    return promise;
  }
}
