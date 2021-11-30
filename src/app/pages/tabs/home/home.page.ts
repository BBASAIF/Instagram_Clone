import { Component, OnInit} from '@angular/core';
import { UserAPIService } from '../../../services/user-api.service';
// import { NavController } from '@ionic/angular';
// import { comments } from '../comments/comments-routing.module';
// import { NavController } from '@ionic/angular';
// simport { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //userInfo: any;
  usersData: any;
  title: any[] = [];
  first: any[] = [];
  last: any[] = [];
  profileimg: any[] = [];
  username: any[] = [];

  constructor(private api: UserAPIService) { }

  ngOnInit() {
      this.loadUser();
  }

  // goAnOtherPage() {
  //   this.route.navigate(['/comments']);
  // }

  async loadUser()
  {
    await this.api.getUsers();
    for(let i = 0; i < 20; i++){
      const user = JSON.parse(localStorage.getItem('user'+i));
      if (user)
      {
        this.usersData = user;
        this.title.push(this.usersData.title);
        this.first.push(this.usersData.first);
        this.last.push(this.usersData.last);
        this.profileimg.push(this.usersData.picture.thumbnail);
        this.username.push(this.usersData.login.username);
      }
    }
  }

}
