import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl ,ValidatorFn, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Http: any;
  formSignup: FormGroup;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private formBuilder: FormBuilder) { 
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password1: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      password2: ['', [Validators.required]],
    }, { validators: this.checkPasswords })
  }

  ngOnInit(): void {
    this.Http = new XMLHttpRequest()
  }

  criarUser() {
    if(!this.formSignup.valid){
      
      alert('Formulario inválido');
      return;
    }
    console.log("vambora");
    var url = 'http://0.0.0.0:30000/user';
    this.Http.open("POST", url);
    let signup_data = {"email": this.formSignup.controls["email"].value, "password": this.formSignup.controls["password1"].value};
    console.log(JSON.stringify(signup_data));
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