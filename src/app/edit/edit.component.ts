import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResponseObj } from '../interface';

interface IEmployee {
  id?: number,
  admin_id?: number,
  name: string,
  gender: string,
  job: string,
  profile_img: null | string,
  profile_picture?: string
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent {
  constructor(private router: Router, private receiverRoute: ActivatedRoute, private httpService: ApiService, private formBuilder: FormBuilder) { }
  editId: number | undefined;
  data: IEmployee = {
    name: '',
    gender: '',
    job: '',
    profile_img: ''
  }
  url: string = 'http://node.mitrahsoft.co.in/users'
  response!: IResponseObj;
  dataArray: IEmployee[] = []
  genderList: string[] = ['Male', 'Female']

  loginForm: FormGroup = this.formBuilder.group({
    job: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    profile_img: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.receiverRoute.queryParams.subscribe((params: Params): void => {
      this.editId = params['args']
      this.httpService.getData(this.url).subscribe({
        next: (res: IResponseObj): void => {
          this.response = res;
          this.dataArray = this.response.recordset as IEmployee[]
          this.dataArray.forEach((element: IEmployee) => {
            if (element.id == this.editId) {
              this.data.name = element.name
              this.data.profile_img = element.profile_picture as string
              this.data.job = element.job
              this.data.gender = element.gender
              this.loginForm.patchValue(this.data)
            }
          })
        },
        error: (error: string): void => console.error('Error message', error),
      })
    });
  }

  navigateFunc(): void {
    this.url = 'http://node.mitrahsoft.co.in/user/' + this.editId
    if (this.loginForm.valid) {
      this.httpService.putData(this.url, this.loginForm.value).subscribe({
        next: (): void => {
          this.router.navigate(['/userlist']);
        },
        error: (error: string): void => console.error('Error message: ', error),
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }
}


