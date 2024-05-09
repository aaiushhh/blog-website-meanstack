import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgIf,UpperCasePipe,TitleCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @Input() search=''
  recentPosts: any[] = [];
  constructor(private http:HttpClient){};
  ngOnInit(): void {
    this.http.get<any>('http://localhost:9992/blog/blogs').subscribe((response) => {
      if (response.status && Array.isArray(response.data)) {
        this.recentPosts = response.data; // Assign the array of blog posts to recentPosts
      } else {
        console.error('Invalid response format:', response);
      }
    });
  }
  displayUserName=''
  displayTitle=''
  displayBlog=''
  
  blog=false;
  display(username: string,title: string,blog: string){
    this.blog=true;
    this.displayUserName=username;
    this.displayTitle=title;
    this.displayBlog=blog;
  }
}
