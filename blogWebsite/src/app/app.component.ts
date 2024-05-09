import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

// import { HttpClientModule } from '@angular/common/http';
// import { AdminService } from './admin.service';
interface Blog {
  username: string;
  title: string;
  blog: string;
  // Add any other properties here based on your API response
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf,NgFor,UpperCasePipe,TitleCasePipe,ProfileComponent,FormsModule,NavbarComponent,HomeComponent,HttpClientModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers:[AdminService]
})
export class AppComponent implements OnInit{
  title = 'blogWebsite';
  searchBlogs: Blog[] = [];
  search = '';
  searchTab = false;
  
  recentPosts: any[] = [];
  constructor(private http:HttpClient){};
  ngOnInit(): void {
    this.http.get<any>('http://localhost:9992/blog/blogs').subscribe((response) => {
      if (response.status && Array.isArray(response.data)) {
        this.recentPosts = response.data; // Assign the array of blog posts to recentPosts
      } else {
        console.error('Invalid response format:', response);
      }
    })
  }
    

  getSearch(search: string): void {
    this.search = search.trim().toLowerCase(); // Normalize search input
    if (this.search.length > 0) {
      this.searchTab = true;
      // Filter recentPosts based on search criteria (matching titles)
      this.searchBlogs = this.recentPosts.filter(post => post.title.toLowerCase().includes(this.search));
    } else {
      this.searchTab = false;
      this.searchBlogs = []; // Clear search results if search is empty
    }
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