import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  Error = '';
  username = '';
  password = '';
  login:boolean=true;
  userid: any;
  email: any;
  constructor(private router: Router,private http:HttpClient) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
      if (resultdata.status) {
        console.log("yes whoLogged" + resultdata.data);
        this.login = false;
        this.username = resultdata.data;
        console.log("username:"+this.username)
        this.http.get<any>("http://localhost:9992/login/email/" + this.username).subscribe((resultdata) => {
          if (resultdata.status) {
            console.log("yes" + resultdata.data._id)
            this.email = resultdata.data.email;
            this.userid = resultdata.data._id;
            console.log("yes email:"+this.email)
          }
          else {
            console.log("no email")
          }
        });
      }

    });

  }
  validateForm() {
    if (this.username.trim() == '') {
      this.Error = 'Username cannot be empty';
      return;
    }

    if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      this.Error = 'Password must have at least 8 characters with one lowercase letter, one uppercase letter, and one digit';
      return;
    }
    this.register();

  }

  redirectToDesignatedLink(a: string) {

    window.location.href = a;
  }

  register() {
    let bodydata = {
      // "email":this.email,
      "password": this.password,
      "username": this.username
    };
    this.http.post('http://localhost:9992/login/login', bodydata).subscribe((resultdata: any) => {
      console.log(resultdata.status);
      console.log(this.password + "? " + resultdata.message)
      if (resultdata.status) {

        console.log(this.password + "? " + resultdata.message)

        this.http.post("http://localhost:9992/whoLogged/create", { "username": this.username }).subscribe((resultdata: any) => {
          if (resultdata.status) {
            console.log("whoLogged Updated")
          }
        })
        this.login = false;
        this.http.get<any>("http://localhost:9992/login/email/" + this.username).subscribe((resultdata) => {
          if (resultdata.status) {
            console.log("yes" + resultdata.data._id)
            this.email = resultdata.data.email;
            this.userid = resultdata.data._id;
          }
          else {
            console.log("no")
          }
        });
        console.log("DONE");
      }


    })

  }
  logout() {
    this.http.delete("http://localhost:9992/whoLogged/del").subscribe((resultdata) => {
      console.log(resultdata)
    })
    this.redirectToDesignatedLink("")
  }
}

