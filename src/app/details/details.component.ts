import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';
import { IResponseObj } from '../interface';

interface IEmployee {
  id?: number,
  admin_id?: number,
  name: string,
  gender: string,
  job: string,
  profile_img: null|string,
  profile_picture?: string
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  constructor(private receiverRoute: ActivatedRoute, private httpService: ApiService) { }
  editId: number | undefined;
  data:IEmployee = {
    name: '',
    gender: '',
    job: '',
    profile_img: ''
  }
  url:string = 'http://node.mitrahsoft.co.in/users'
  response!: IResponseObj;
  dataArray: IEmployee[] = []

  ngOnInit(): void {
    this.receiverRoute.queryParams.subscribe((params: Params):void => {
      this.editId = params['args']
      this.httpService.getData(this.url).subscribe({
        next: (res:IResponseObj): void => {
          this.response = res;
          this.dataArray = this.response.recordset as IEmployee[]
          this.dataArray.forEach((element: IEmployee) => {
            if (element.id == this.editId) {
              this.data.name = element.name
              this.data.profile_img = element.profile_picture as string
              this.data.job = element.job
              this.data.gender = element.gender
            }
          })
        },
        error: (error:string): void => console.error('Error message: ', error),
      })
    });
  }
}

