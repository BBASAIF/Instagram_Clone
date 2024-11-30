import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { UserAPIService } from '../../../services/user-api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

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

  async loadUser()
  {
    //await this.api.getUsers();
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
