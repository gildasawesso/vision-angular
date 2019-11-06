import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import { MenuItemComponent } from './home/menu-item/menu-item.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import {AppbarComponent} from './home/appbar/appbar.component';
import {SubbarComponent} from './home/subbar/subbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgxPermissionsModule} from 'ngx-permissions';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    MenuItemComponent,
    HomeContentComponent,
    AppbarComponent,
    SubbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgxPermissionsModule.forChild()
  ]
})
export class HomeModule { }
