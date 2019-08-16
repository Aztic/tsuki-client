import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/htmlmixed/htmlmixed';
import {map, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from 'src/app/components/description-dialog/description-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  id = '';
  name = '';
  description = '';
  content = '';
  contentChanged: Subject<string> = new Subject<string>();

  changeIframe() {
    const iframe = document.getElementById('preview') as HTMLIFrameElement;

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(this.content);
    iframe.contentWindow.document.close();

  }
  changed(text: string) {
    this.content = text;
    this.contentChanged.next(text);
  }

  constructor(public route: ActivatedRoute,
              public overlayService: SpinnerOverlayService,
              public dialog: MatDialog,
              public deviceService: DeviceDetectorService,
              private projectService: ProjectService,
              private router: Router,
              private location: Location,
              private snackBar: MatSnackBar
    ) {
    overlayService.show();
    // Debounce for preview
    this.contentChanged.pipe(
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(content => {
        // this.content = content;
        this.changeIframe();
      });
  }

  ngOnInit() {
    this.route.params
    .pipe(map(p => p.id))
    .subscribe(async (id) => {
      this.id = id;
      if (this.id !== 'new') {
        const projectInfo: any = await this.projectService.getProjectInfo(id)
          .catch(async (err) => {
            await this.overlayService.hide();
            this.router.navigate(['/home'], {queryParams: {error: 'Error loading project'}});
          });
        this.name = projectInfo.project_name;
        this.description = projectInfo.project_description;
        this.content = projectInfo.data;
      } else {
        this.name = 'New project';
        this.description = 'Nice project';
        this.content = '<html>\n</html>';
      }
      this.changeIframe();
      await this.overlayService.hide();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DescriptionDialogComponent, {
      width: '450px',
      height: '450px',
      data: {description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;

      console.log(this.description);
    });
  }

  saveTemplate = () => {
    this.overlayService.show();
    if (this.id === 'new') {
      // Create a new project
      this.projectService.createProject(this.name, this.description, this.content)
        .then(async (projectId: string) => {
          this.id = projectId;
          this.location.replaceState(`/project/${projectId}`);
          await this.overlayService.hide();
          this.snackBar.open('Project created', 'close', {
            duration: 2000,
            panelClass: ['black-snackbar']
          });
        })
        .catch(async (err) => {
          await this.overlayService.hide();
          this.snackBar.open('Error saving project', 'close', {
            duration: 2000,
            panelClass: ['black-snackbar']
          });
        });
    } else {
      // Save the current project
      this.projectService.updateProject(this.name, this.description, this.content, this.id)
      .then(async (projectId: string) => {
        await this.overlayService.hide();
        this.snackBar.open('All changes saved', 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      })
      .catch(async (err) => {
        await this.overlayService.hide();
        this.snackBar.open('Error saving project', 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      });
    }
  }

  copyToClipboard = () => {
    return `${environment.apiUrl}/projects/${this.id}`;
  }

  notify(event) {
    this.snackBar.open('Copied to clipboard!', 'close', {
      duration: 2000,
      panelClass: ['black-snackbar']
    });
  }

}
