import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [
    {
    title: 'Post 1',
    text: 'Documentation and examples for Bootstrap’s powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.',
    id: 1
  },
    {
      title: 'Post 2',
      text: 'Documentation and examples for Bootstrap’s powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.',
      id: 2
    },
    {
      title: 'Post 3',
      text: 'Documentation and examples for Bootstrap’s powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.',
      id: 3
    }
    ];
  infoIsShow: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleInfoBlock() {
    this.infoIsShow = !this.infoIsShow;
  }

}
