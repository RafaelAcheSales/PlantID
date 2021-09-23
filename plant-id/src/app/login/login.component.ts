import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  Http: any;
  constructor(private service: SessionService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.Http = new XMLHttpRequest()
  }
  logoff(): void {
    alert("logging off");
    this.service.clearLogin();

  }
  login(): void{
    // if (this.service.isLogged()) {
    //   alert("already logged in");
    //   return;
    // }
    var url = 'http://0.0.0.0:3000/login';
    this.Http.open("POST", url);
    let login_data = {"email": this.email, "password": this.password};
    console.log(JSON.stringify(login_data));
    this.Http.send();
    this.Http.onreadystatechange = () => {
      switch (this.Http.readyState) {
        case 4:
          this.service.setLogin(this.email, this.password);
          let status = this.Http.status;
          
          if (status >= 200 && status < 300 || true) {
            this.router.navigate(['/home']);
            alert("sucess");
          } else {
            
            alert("could not login");
          }
          break;
        default:
          break;
      }

    }
    // alert('Formulario Válido');
  }

}
