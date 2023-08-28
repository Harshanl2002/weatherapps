import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { getLocaleDayNames } from '@angular/common';
// import * as CityNames from '../../assets/city.list.json'

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
  localname!:String;
  todate= new Date();
  city:CityNames[]=[
    new CityNames(1,"London"),
    new CityNames(2,"Chennai"),
    new CityNames(3,"New York"),
  ];
  num=4;
  text:String="";
  place="Search by City";
  textera()
  {
    this.text="";
  }
  url=`https://openweathermap.org/img/wn/`;
  constructor(private http:HttpClient)
  {

  }
  round(num: number): String {
    return (Math.round(num * 100) / 100).toFixed(0);
  }
  ngOnInit(): void {
    this.getlocation();
    
    // console.log(this.city);
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
        this.localname=this.climate.name;
        console.log(this.localname)
        !this.isinclude(this.localname)?this.city.push(new CityNames(this.num++,this.localname)):console.log("not added");
        console.log(this.climate)
      });
      // console.log(this.isinclude(this.climate.name)?"not added"+this.city.push(new CityNames(this.num++,this.climate.name)):this.city.push(new CityNames(this.num++,this.climate.name)),"added");
      
  };

  onsubmit()
  {
    
    if(this.text!="")
    {
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.text}&units=metric&appid=d63ffdc782c304f7d34d21c57518639c`).subscribe((data)=>{
        this.climate=data;
        console.log(data);
      },()=>{
        alert("something went wrong");
      });
      console.log("submited",this.text)
      !this.isinclude(this.text)?this.city.push(new CityNames(this.num++,this.text)):"not added";
      this.text="";
      console.log(this.city)
    }
    else{
      console.log("something went wrong")
    }
    
  }
  isinclude(t:String)
  {
    for(let c of this.city)
    {
      if(c.name===t)
      {
        return true;
      }
    }
    return false;
  }
  getdate(num:number)
  {
    return new Date(num*1000).toUTCString();
  }
  geticon()
  {
    // console.log(this.localname)
    return (this.climate.weather[0].icon as String).replaceAll('n','d');
  }
  display(n:number)
  {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city[n-1].name}&units=metric&appid=d63ffdc782c304f7d34d21c57518639c`).subscribe((data)=>{
        this.climate=data;
        console.log(data);
      },()=>{
        alert("something went wrong");
      });
  }
  
}
class CityNames{
  constructor(public id:number,public name:String)
  {

  }
}
