import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudiesPage } from './studies.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StudiesPageRoutingModule } from './studies-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StudiesPageRoutingModule
  ],
})
export class StudiesPageModule {}
