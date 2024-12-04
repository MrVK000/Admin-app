import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {
  url: string = 'http://node.mitrahsoft.co.in/login'
  constructor(private router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loginStatus=localStorage.getItem('tokenList')
      if(loginStatus !==null) {
        return true;
      }
      else{
        this.router.navigateByUrl('/login')
        return false;
      }
  }

}
