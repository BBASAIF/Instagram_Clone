import { Component, OnInit, ViewChild} from '@angular/core';
import { UserAPIService } from '../../../services/user-api.service';
import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
// import { comments } from '../comments/comments-routing.module';
// import { NavController } from '@ionic/angular';
// simport { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, {
    static: true
}) infiniteScroll: IonInfiniteScroll;

  //userInfo: any;
  usersData: any;
  title: any[] = [];
  first: any[] = [];
  last: any[] = [];
  profileimg: any[] = [];
  username: any[] = [];
  items = [];
  message= '';
  limit = 50;
  offset = 0;
  res: any;
  is_fav = false;

  constructor(private api: UserAPIService,
    //  private socialSharing: SocialSharing
    private router: Router,
     ) { }

  ngOnInit() {
      this.loadUser();
  }

  // goAnOtherPage() {
  //   this.route.navigate(['/comments']);
  // }

  async loadUser()
  {
    await this.api.getUsers();
    for(let i = 0; i < 10; i++){
      const user = JSON.parse(localStorage.getItem('user'+i));
      this.items.push( this.items.length );
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


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
     this.api.getUsers();
      for(let i = 0; i < 10; i++){
        const user = JSON.parse(localStorage.getItem('user'+i));
        this.items.push( this.items.length );
        if (this.items.length === 0) {
          this.message = 'No Records';
        }


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

      this.offset += this.limit;
      if (infiniteScroll) {
        infiniteScroll.target.complete();

        if (this.items.length < this.limit) {
          infiniteScroll.target.disabled = true;
        }
      }

      console.log('Async operation has ended');
      infiniteScroll.target.complete();
    },  5000);
  }

  addFav(item = null){
    if(item.favorite === false){
      item.favorite = true;
    }else{
      item.favorite =false;
    }

  }

  OtherShare(){

    // this.socialSharing.share('this is only title for share to socail media for Instagram Clone Challenge').then(() => {
     alert('The App has Successfuly Shared.');
  //   }, err => {
  //     alert(err);
  //   });
  }

  openProfile(username, profileimg){

      // this.router.navigate(['tabs/profile'], username);
      this.router.navigate([`${this.router.url}/profile`, username, profileimg]);
  }

}
