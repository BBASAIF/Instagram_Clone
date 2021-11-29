import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { UserAPIService } from '../../../services/user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  slideOpts ={};
  stories: any[] = [];
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];
  userInfo:any;

  constructor
  (
    private navCtrl: NavController,
    private api: UserAPIService,

  ) { }

  ngOnInit() {
    
      // this.userInfo = this.api.isAuth();
    
    this.api.getUser().then(res=>{
      this.userInfo = res;
      console.log('user info is', this.userInfo);
    })
    this.stories = [
      { name: 'New'},
      { name: 'Vscode', src: 'assets/imgs/circles/vscode.png'},
      { name: 'Upwork', src: 'assets/imgs/circles/upwork.png'},
      { name: 'Laravel', src: 'assets/imgs/circles/laravel.png'},
      { name: 'Ionic', src: 'assets/imgs/circles/ionic.png'},
      { name: 'Unity', src: 'assets/imgs/circles/unity.png'},
      { name: 'Unreal', src: 'assets/imgs/circles/unreal.png'},
      { name: 'Blender', src: 'assets/imgs/circles/blender.png'},
      { name: 'Playstation', src: 'assets/imgs/circles/playstation.png'},
      { name: 'Xbox', src: 'assets/imgs/circles/xbox.png'},
      { name: 'Steam', src: 'assets/imgs/circles/steam.png'},
      { name: 'Uplay', src: 'assets/imgs/circles/uplay.png'},
      { name: 'Orgin', src: 'assets/imgs/circles/orgin.png'},
    ];
    this.slideOpts={
      slidesPerView: this.checkScreen(),
      slideShadows: true
    };
    this.buttonItems = [
      {value: 'grid', icon: 'grid'},
      {value: 'reels', icon: 'film'},
      {value: 'photos', icon:'images'},
    ];
    this.posts = [
      {id: 1, url: 'assets/imgs/posts/1.jpg'},
      {id: 2, url: 'assets/imgs/posts/2.jpg'},
      {id: 3, url: 'assets/imgs/posts/3.jpg'},
      {id: 4, url: 'assets/imgs/posts/4.jpg'},
      {id: 5, url: 'assets/imgs/posts/5.jpg'},
      {id: 6, url: 'assets/imgs/posts/6.jpg'},
      {id: 7, url: 'assets/imgs/posts/7.jpg'},
      {id: 8, url: 'assets/imgs/posts/8.jpg'},
      {id: 9, url: 'assets/imgs/posts/9.jpg'},
      {id: 10, url: 'assets/imgs/posts/10.jpg'},
      {id: 11, url: 'assets/imgs/posts/11.jpg'},
      {id: 12, url: 'assets/imgs/posts/12.jpg'},

    ];
  }
  checkScreen(){
    const innerWidth = window.innerWidth;
    switch (true){
      case 340 > innerWidth:
        return this.checkLength(5.5);
      case 340 <= innerWidth && innerWidth <= 400:
        return this.checkLength(5.5);
      case 401 <= innerWidth && innerWidth <= 700:
        return this.checkLength(6.5);
      case 701 <= innerWidth && innerWidth <= 900:
        return this.checkLength(7.5);
      case 901 <= innerWidth:
        return this.checkLength(9.5);
    }
  }

  checkLength(val){
    const length = this.stories.length;
    return val < length? val : length;
  }

  buttonsChanged(event){
    this.buttonValue = event.detail.value;
  }

  getImage(){
    if(this.userInfo.picture.thumbnail)
      return this.userInfo.picture.thumbnail;

    return 'assets/imgs/logo.png';
  }

}
