import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IEmployee, IResponseObj } from '../interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  url: string = 'http://node.mitrahsoft.co.in/users';
  flag: boolean = true;
  response!: IResponseObj;
  dataArray: IEmployee[] = []

  constructor(private router: Router, private httpService: ApiService) { }

  ngOnInit(): void {
    this.flag = true
    this.httpService.getData(this.url).subscribe({
      next: (res: IResponseObj): void => {
        this.flag = false
        this.response = res
        this.dataArray = this.response.recordset as IEmployee[]
      },
      error: (error: string): void => {
        this.flag = false
        console.error('Error message: ', error)
      }
    })
  }

  navigateFunc(): void {
    localStorage.removeItem('tokenList')
    this.router.navigate(['/login']);
  }

  editFunc(input: number): void {
    let args: number = this.dataArray[input].id as number
    this.router.navigate(['/edit'], {
      queryParams: { args }
    })
  }

  deleteFunc(input: number): void {
    this.url = 'http://node.mitrahsoft.co.in/user/' + this.dataArray[input].id
    this.httpService.deleteData(this.url).subscribe({
      next: (): void => window.top?.location.reload(),
      error: (error: string): void => console.error('Error message: ', error),
    })

  }

  detailsFunc(input: number): void {
    let args: number = this.dataArray[input].id as number
    this.router.navigate(['/details'], {
      queryParams: { args }
    })
  }

  backfun(): void {
    this.router.navigate(['/home']);
  }
}
