import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{
  constructor(private http:HttpClient){};
  username='anonymous'
  blog=''
  title=''
ngOnInit(): void {
  // throw new Error('Method not implemented.');
  this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
    if (resultdata.status) {
      console.log("yes whoLogged" + resultdata.data[0])
      this.username =  resultdata.data.toString();
      console.log("username:" + typeof(this.username))
    }
  });
}

  addBlog(){let bodydata={
    "username":this.username,
      "title":this.title.toString(),
      "blog":this.blog.toString()};
      this.http.post('http://localhost:9992/blog/create',bodydata).subscribe((resultdata:any)=>{
        console.log(resultdata.status);
        console.log("DONE");
        if(resultdata.status){
          this.redirectToDesignatedLink();
        }
        else{
          console.log("Error")
        }
      })
      
  }
  redirectToDesignatedLink() {
    window.location.href = '';
  }

}
