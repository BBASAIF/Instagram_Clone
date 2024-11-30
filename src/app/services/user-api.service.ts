import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  baseApiUrl: any = 'https://randomuser.me/api/?results=60';
  userData: any;
  usersData: any[]= [];
  public tab = new BehaviorSubject<any>(null);
  public reload = new BehaviorSubject<boolean>(false);
  // Reload = this.reload.asObservable();

  constructor(private http: HttpClient,) {
    //this.loadUser();

   }

   async loadUser()
   {
      const user = await localStorage.getItem('user');
      if (user)
      {
        this.userData = user;
        //console.log('userdata in loaddata is', this.userData);
        //return this.userData;
      }
    }

    getUsers(){
      return new Promise((resolve, reject) => {
        this.getData().subscribe(
          (res: any) => {
            //console.log('random user api is', res);
            if(res.results){
              for(let i = 0; i < 60; i++){
                localStorage.setItem('user'+i, JSON.stringify(res.results[i]));
                this.userData = res.results[i];
                resolve(res.results[i]);
              }
            } else {
              reject(res);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    }

    getData() {
      let header = new HttpHeaders();
      header = header.set('Content-Type', 'application/json');
      header = header.set('Access-Control-Allow-Origin', '*');
      header = header.set('Access-Control-Allow-Headers', '*');
      header = header.set('Accept', 'application/json, text/plain');
      return this.http.get(this.baseApiUrl, { headers: header });
    }

    public isAuth() {
      return !!this.userData;
    }

    setTab(val){
      this.tab.next(val);
    }

}
