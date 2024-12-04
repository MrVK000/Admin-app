import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  url: string = 'http://node.mitrahsoft.co.in/register'
  flag: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    first_name: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.pattern("^[A-Za-z]+$")]),
    last_name: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.pattern("^[A-Za-z]+$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private router: Router, private httpService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  navigateFunc(): void {
    this.flag=true
    if (this.loginForm.valid) {
      this.httpService.postData(this.url, this.loginForm.value).subscribe({
        error: (error:string): void => {
          this.flag = false
          console.error('Error message: ', error)
        }
      })
      this.router.navigate(['/login']);
    }
    else {
      this.flag = false
      this.loginForm.markAllAsTouched()
    }
  }
}

