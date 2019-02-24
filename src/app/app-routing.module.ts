import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/pages/main/main-page.component';
import { DetailsPageComponent } from './components/pages/details/details-page.component';

const routes: Routes = [{
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  }, {
    path: 'details/:id',
    component: DetailsPageComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
