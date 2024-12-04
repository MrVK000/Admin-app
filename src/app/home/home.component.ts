import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IResponseObj } from '../interface';
import { IEmployee } from '../interface';
import { IUserJobList } from '../interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private httpService: ApiService) { }

  men: number = 0
  women: number = 0
  jobArray: string[] = []
  keyArray: string[] = []
  valueArray: number[] = []
  finalObj: IUserJobList = {}
  arrayObj: IEmployee[] = []
  dataSource: IEmployee[] = []
  response: IResponseObj = {};
  url: string = 'http://node.mitrahsoft.co.in/users'

  ngOnInit(): void {
    // localStorage.setItem('tokenList','qwe')

    let recordset: IEmployee[];
    this.httpService.getData(this.url).subscribe({
      next: (res: IResponseObj): void => {
        this.response = res as IResponseObj
        recordset = this.response.recordset as IEmployee[]
        recordset.forEach((item: IEmployee) => {
          if (item.gender === 'Male') {
            this.men++;
          }
          if (item.gender === 'Female') {
            this.women++;
          }
          this.jobArray.push(item.job as string)
        })
        this.jobArray.forEach((element: string) => {
          this.finalObj[element] = (this.finalObj[element] || 0) + 1;
        });
        this.keyArray = Object.keys(this.finalObj)
        this.valueArray = Object.values(this.finalObj)
        for (let i = 0; i < this.keyArray.length; i++) {
          this.arrayObj.push({
            job: this.keyArray[i],
            count: this.valueArray[i]
          })
        }
        this.dataSource = this.arrayObj;
      },
      error: (error: string): void => console.error('Error message: ', error),
    })
  }
  userButtonFunc(): void {
    this.httpService.getData(this.url).subscribe({
      error: (error: string): void => console.error('Error message: ', error),
    })
    this.router.navigate(['/userlist']);
  }
  logoutButtonFunc(): void {
    localStorage.removeItem('tokenList')
    this.router.navigate(['/login']);
  }
  displayedColumns: string[] = ['job', 'count'];
}
