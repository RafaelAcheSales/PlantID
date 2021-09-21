import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl ,ValidatorFn, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
  }

  criarUser() {
    if(!this.formSignup.valid){
      const Http = new XMLHttpRequest();
      const url='https://jsonplaceholder.typicode.com/posts';
      Http.open("GET", url);
      Http.send();
      
      Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
      }
      alert('Formulario inválido');
      return;
    }
    alert('Formulario Válido');
  }

  
}