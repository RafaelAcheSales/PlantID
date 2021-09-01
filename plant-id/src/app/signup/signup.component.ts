import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password1: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      password2: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  criarUser() {
    if(!this.formSignup.valid){
      alert('Formulario inválido');
      return;
    }
    alert('Formulario Válido');
  }

}
