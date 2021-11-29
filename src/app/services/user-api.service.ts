import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  baseApiUrl: any = 'https://randomuser.me/api/';
  userData: any;

  constructor
  (
    private http: HttpClient,
  ) {
    
    this.loadUser();

   }

   async loadUser() 
   {
      const user = await localStorage.getItem('user');    
      if (user) 
      {
        this.userData = JSON.parse(user);
        console.log('userdata in loaddata is', this.userData);
      }
    }


    getUser(){
      return new Promise((resolve, reject) => {
        this.getData().subscribe(
          (res: any) => {
            // console.log('random user api is', res);
            if(res.results){
            
              localStorage.setItem('user', JSON.stringify(res.results[0]));
              this.userData = res.results[0];
              console.log('random user api in userapi service userdata is', this.userData);
              resolve(res.results[0]);
            } else {
              reject(res)
            }
          },
          (err) => {
            reject(err)
          }
        );
      })
    }

    getData() {
      let header = new HttpHeaders();
      header = header.set('Content-Type', 'application/json');
      header = header.set('Access-Control-Allow-Origin', '*');
      header = header.set('Access-Control-Allow-Headers', '*');
      header = header.set('Accept', 'application/json, text/plain');
      return this.http.get(this.baseApiUrl, { headers: header })
    }

    public isAuth() {
      return !!this.userData;
    }
  
}