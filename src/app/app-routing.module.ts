import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectViewComponent } from './pages/project-view/project-view.component';
import { LoggedOutGuard } from './guards/logged_out.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'home',
    component: ProjectListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project/:id',
    component: ProjectViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
