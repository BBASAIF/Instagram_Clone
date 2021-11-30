import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../../../services/user-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo: any;
  title: any[] = [];
  first: any[] = [];
  last: any[] = [];
  profileimg: any[] = [];
  username: any[] = [];

  constructor(private api: UserAPIService) { }

  ngOnInit() {
    for(let i = 0; i < 10; i++){
      this.api.getUser().then(res=>{
        this.userInfo = res;
        this.title.push(this.userInfo.name.title);
        this.first.push(this.userInfo.name.first);
        this.last.push(this.userInfo.name.last);
        this.profileimg.push(this.userInfo.picture.thumbnail);
        this.username.push(this.userInfo.login.username);
      });
    }
  }

}
