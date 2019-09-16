import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import { MenuItemComponent } from './home/menu-item/menu-item.component';
import { HomeContentComponent } from './home/home-content/home-content.component';

@NgModule({
  declarations: [HomeComponent, MenuItemComponent, HomeContentComponent],
  imports: [
   SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
