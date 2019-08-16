import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { Project, ProjectList } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';


function sleep(ms)  {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  error: string = null;
  totalPages = 0;
  constructor(
    public overlayService: SpinnerOverlayService,
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) {
    overlayService.show();
    // Get projects
    this.projectService.getProjects(1)
    .then(async (res: ProjectList) => {
      this.projects = res.result;
      this.totalPages = Math.floor(res.total / res.itemsPerPage);
      await overlayService.hide();
    })
    .catch(async (err) => {
      this.userService.logout();
      await this.overlayService.hide();
      this.router.navigate(['/login']);
    });

    // See if there's any error
    this.route.queryParams.subscribe(params => {
      this.error = params.error;
      if (this.error) {
        this.snackBar.open(this.error, 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      }
    });

  }

  ngOnInit() {
  }

  deleteProject(projectId) {
    this.overlayService.show();
    this.projectService.deleteProject(projectId)
      .then(async () => {
        this.projects = this.projects.filter( p => p.project_identifier !== projectId);
        await this.overlayService.hide();
        this.snackBar.open('Project deleted', 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      })
      .catch(async (err) => {
        await this.overlayService.hide();
        this.snackBar.open('Error deleting project', 'close', {
          duration: 2000,
        });
      });
  }

  copyToClipboard = (id) => {
    return `${environment.apiUrl}/projects/${id}`;
  }

  notify(event) {
    this.snackBar.open('Copied to clipboard!', 'close', {
      duration: 2000,
      panelClass: ['black-snackbar']
    });
  }

}
