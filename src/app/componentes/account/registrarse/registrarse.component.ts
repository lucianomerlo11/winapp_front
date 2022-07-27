import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  // Login Form
  FormReg!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private fireSerivce: FirebaseService) { }

  ngOnInit(): void {
    this.FormReg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', Validators.required],
      apellido: ['', [Validators.required]],
      nombre: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.FormReg.controls; }

  registrar() {
    this.submitted = true;
    if (this.FormReg.invalid) {
      return;
    }
    else {
      this.fireSerivce.registrar(this.FormReg.value.email, this.FormReg.value.password)
        .then((res: any) => {
          console.log(res.user);
      })
    }
  }
  onSubmit() {
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.signupForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.register(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.successmsg = true;
    //       if (this.successmsg) {
    //         this.router.navigate(['']);
    //       }
    //     })
    //       .catch((error: string) => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.userService.register(this.signupForm.value)
    //       .pipe(first())
    //       .subscribe(
    //         (data: any) => {
    //           this.successmsg = true;
    //           if (this.successmsg) {
    //             this.router.navigate(['/auth/login']);
    //           }
    //         },
    //         (error: any) => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

}
