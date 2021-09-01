import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages import
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: 'home', component:  MainPageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
