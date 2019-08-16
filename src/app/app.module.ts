import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LoginComponent } from './pages/login/login.component';
import { MatSnackBar, MatDialog, MatDialogModule } from '@angular/material';
import { ComponentsModule } from './components/components.module';
import { SpinnerOverlayService } from './services/spinner-overlay.service';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectViewComponent } from './pages/project-view/project-view.component';
import { RouterModule } from '@angular/router';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CopyClipboardModule } from './directives/copy-clipboard.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectListComponent,
    ProjectViewComponent
  ],
  entryComponents: [DescriptionDialogComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    CodemirrorModule,
    CopyClipboardModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    MatSnackBar,
    SpinnerOverlayService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
