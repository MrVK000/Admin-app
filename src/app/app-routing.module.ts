import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ActiveGuard } from './active.guard';
import { HomeComponent } from './home/home.component';
import { LoginguardGuard } from './loginguard.guard';
import { ErrorComponent } from './error/error.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[LoginguardGuard]

  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[LoginguardGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[ActiveGuard]
  },
  {
    path:'userlist',
    component:ListComponent,
    canActivate:[ActiveGuard]
  },
  {
    path:'edit',
    component:EditComponent,
    canActivate:[ActiveGuard]
  },
  {
    path:'add',
    component:AddComponent,
    canActivate:[ActiveGuard]
  },
  {
    path:'details',
    component:DetailsComponent,
    canActivate:[ActiveGuard]
  },
  {
    path:'**',
    component:ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
