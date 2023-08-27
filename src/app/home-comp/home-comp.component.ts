import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home-comp',
  templateUrl: './home-comp.component.html',
  styleUrls: ['./home-comp.component.css']
})
export class HomeCompComponent implements OnInit{
  lat:any;
  lan:any;
  climate:any;
  title="Weather app";
  todate= new Date();
  url=`https://openweathermap.org/img/wn/`;
  constructor(private http:HttpClient)
  {

  }
  round(num: number): String {
    return (Math.round(num * 100) / 100).toFixed(0);
  }
  ngOnInit(): void {
    this.getlocation();
  };
  getlocation()
  {
    navigator.geolocation.getCurrentPosition((resp)=>{this.getclimate(resp)});
  }
  getclimate(resp:any)
  {
      this.lat=resp.coords.latitude;
      this.lan=resp.coords.longitude;
      console.log("position",this.lat,this.lan);
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lan}&units=metric&appid=d63ffdc782c304f7d34d21c57518639c`).subscribe((data)=>{
        this.climate=data;
        console.log(this.climate)
      });   
  };
  
}
