import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'list/:type',
    component: MainContentComponent
  },
  {
    path: 'details/:type/:name',
    component: ItemDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
