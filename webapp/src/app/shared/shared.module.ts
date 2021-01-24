import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GenericLegendComponent } from './components/generic-legend/generic-legend.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  PageNotFoundComponent,
  GenericLegendComponent
];

@NgModule({
  declarations: sharedComponents,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: sharedComponents
})
export class SharedModule { }
