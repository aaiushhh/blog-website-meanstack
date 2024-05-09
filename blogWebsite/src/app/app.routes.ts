import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"add-post",component:AddPostComponent },
    {path:"sign-up",component:SignUpComponent}

];
