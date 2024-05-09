import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers:[HttpClient]
})
export class SignUpComponent {
  Error=''
  username:any=''
  password=''
  verificationSuccess = false;
  path = 'login';
  email=''

  constructor(private http:HttpClient){}
  validateForm(){
    this.Error = '';

    if (!this.email.trim()) {
      this.Error = 'E-mail is required.';
      return; 
    }
     
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if (!emailRegex.test(this.email)) {
       this.Error = 'Invalid email format.';
       return; 
     }

    if (!this.username.trim()) {
      this.Error = 'Username is required.'+this.username;
      console.log(this.username )
      return; 
    }

    // Username validation
    if (this.username.length < 4 || this.username.length > 10) {
      this.Error = 'Username must be between 4 and 10 characters.';
      return; 
    } else if (!/^[a-zA-Z0-9_.]+$/.test(this.username)) {
      this.Error = 'Username can only contain letters, numbers, ".", and "_".';
      return; 
    }


    
    if (!this.password.trim()) {
      this.Error = 'Password is required.';
      return; 
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (this.password.length < 8 || this.password.length > 12) {
      this.Error = 'Password must be between 8 and 12 characters.';
      return; 
    } else if (!passwordRegex.test(this.password)) {
      this.Error = 'Password must have at least one lowercase, one uppercase, one number, and one special character.';
      return; 
    }
    this.register()
    
  }
  
  redirectToDesignatedLink() {
    window.location.href = '';
  }
  register(){
    let bodydata={
  "email":this.email,
    "password":this.password,
    "username":this.username};
    this.http.post('http://localhost:9992/login/create',bodydata).subscribe((resultdata:any)=>{
      console.log(resultdata.status);
      console.log("DONE");
      if(resultdata.status){
        this.redirectToDesignatedLink();
      }
      else{
        this.Error="Account already exists"
      }
    })

  }
  clearError() {
    this.Error = ''; // Clear the error message
  }
}
