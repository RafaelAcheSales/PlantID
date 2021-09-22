import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  Http: any;
  constructor() { }

  ngOnInit(): void {
    this.Http = new XMLHttpRequest()
  }
  login(): void{
    var url = 'http://0.0.0.0/api/login';
    this.Http.open("POST", url);
    let login_data = {"email": this.email, "password": this.password};
    console.log(JSON.stringify(login_data));
    this.Http.send();
    
    this.Http.onreadystatechange = () => {
      switch (this.Http.readyState) {
        case 4:
          let status = this.Http.status;
          if (status >= 200 && status < 300) {
            console.log("sucess");
          } else {
            
            console.log("could not create account");
          }
          break;
      
        default:
          break;
      }

    }
    // alert('Formulario Válido');
  }

}
