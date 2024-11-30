import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../../../services/user-api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

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
