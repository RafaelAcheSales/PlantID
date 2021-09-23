import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl ,ValidatorFn, ValidationErrors} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Http: XMLHttpRequest;
  formSignup: FormGroup;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.Http = new XMLHttpRequest();
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password1: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      password2: ['', [Validators.required]],
    }, { validators: this.checkPasswords })
  }

  ngOnInit(): void {
    
  }

  criarUser() {
    if(!this.formSignup.valid){
      
      alert('Formulario inválido');
      return;
    }
    console.log("vambora");
    var url = 'http://localhost:3000/user';
    this.Http.open("POST", url);
    let signup_data = {"email": this.formSignup.controls["email"].value, "password": this.formSignup.controls["password1"].value};
    this.Http.setRequestHeader("Content-Type","application/json");
    this.Http.send(JSON.stringify(signup_data));
    this.Http.onreadystatechange = () => {
      
      switch (this.Http.readyState) {
        case 1: 
          
          break;
        case 4:
          let status = this.Http.status;
          if (status >= 200 && status < 300) {

            alert("sucess");
          } else {
            
            alert("could not create account");
          }
          break;
      
        default:
          break;
      }

    }
    // alert('Formulario Válido');
  }

  
}