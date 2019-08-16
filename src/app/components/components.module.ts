import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MaterialModule } from '../modules/material.module';
import { RouterModule } from '@angular/router';
import { DescriptionDialogComponent } from './description-dialog/description-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpinnerOverlayComponent, ToolbarComponent, DescriptionDialogComponent],
  entryComponents: [SpinnerOverlayComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MaterialModule
  ],
  exports: [SpinnerOverlayComponent, ToolbarComponent, DescriptionDialogComponent]
})
export class ComponentsModule { }
