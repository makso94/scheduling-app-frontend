import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const materialModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatGridListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatBadgeModule,
  MatButtonToggleModule,
  NgxMaterialTimepickerModule,
  MatDialogModule,
  MatStepperModule,
  MatTabsModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
