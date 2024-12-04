import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent {
  genderList: string[] = ['Male', 'Female']
  flag: boolean = false
  url: string = 'http://node.mitrahsoft.co.in/user';

  constructor(private router: Router, private httpService: ApiService, private formBuilder: FormBuilder) { }

  loginForm: FormGroup = this.formBuilder.group({
    name: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    job: new FormControl("", Validators.required),
    profile_img: new FormControl("", Validators.required),
  });

  navigateFunc(): void {
    this.flag = true
    if (this.loginForm.valid) {
      this.httpService.postData(this.url, this.loginForm.value).subscribe({
        next: (): void => {
          this.router.navigate(['/userlist']);
        },
        error: (error: Object): void => {
          console.error('Error message: >>>', {error}.error);
          this.router.navigate(['/userlist']);
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }
}

