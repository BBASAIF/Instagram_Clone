import { Component, OnInit } from '@angular/core';
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
  userInfo: any;
  title: any;
  first: any;
  last: any;
  profileimg: any;
  username: any;



  constructor(private api: UserAPIService) { }

  ngOnInit() {
    this.api.getUser().then(res=>{
      this.userInfo = res;
     this.title = this.userInfo.name.title;
     this.first = this.userInfo.name.first;
     this.last = this.userInfo.name.last;
     this.profileimg = this.userInfo.picture.thumbnail;
     this.username = this.userInfo.login.username;

      console.log('user info is', this.userInfo);
    });
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
      {id: 1, url: 'https://picsum.photos/id/217/200'},
      {id: 2, url: 'https://picsum.photos/id/227/200'},
      {id: 3, url: 'https://picsum.photos/id/237/200'},
      {id: 4, url: 'https://picsum.photos/id/247/200'},
      {id: 5, url: 'https://picsum.photos/id/257/200'},
      {id: 6, url: 'https://picsum.photos/id/267/200'},
      {id: 7, url: 'https://picsum.photos/id/277/200'},
      {id: 8, url: 'https://picsum.photos/id/287/200'},
      {id: 9, url: 'https://picsum.photos/id/297/200'},
      {id: 10, url: 'https://picsum.photos/id/117/200'},
      {id: 11, url: 'https://picsum.photos/id/127/200'},
      {id: 12, url: 'https://picsum.photos/id/137/200'},

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
    if(this.userInfo.picture.thumbnail){
      return this.userInfo.picture.thumbnail;
    }

    return 'assets/imgs/logo.png';
  }

}
