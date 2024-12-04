import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IResponse } from '../interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  url: string = 'http://node.mitrahsoft.co.in/login'
  response: IResponse = {
    email: '',
    admin_id: 0,
    first_name: '',
    last_name: '',
    token: ''
  };
  flag: boolean = false

  constructor(private router: Router, private httpService: ApiService, private formBuilder: FormBuilder) { }

  validFunc(): void {
    this.flag = true
    if (this.loginForm.valid) {
      this.httpService.postData(this.url, this.loginForm.value).subscribe({
        next: (res: any): void => {
          this.response = JSON.parse(res) as IResponse
          if (this.response.token !== '') {
            localStorage.setItem('tokenList', this.response.token);
            this.flag = false;
            this.router.navigate(['/home']);
          }
        },
        error: (error: string): void => {
          this.flag = false
          console.error('Error message: ', error)
        },
      })
    }
    else {
      this.flag = false
      this.loginForm.markAllAsTouched()
    }
  }
}
