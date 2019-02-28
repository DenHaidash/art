import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from '../components/pages/main/main-page.component';
import { DetailsPageComponent } from '../components/pages/details/details-page.component';
import { ArtObjectResolver } from './resolvers/art-object.resolver';
import { ArtObjectListResolver } from './resolvers/art-object-list.resolver';

const routes: Routes = [{
    path: '',
    component: MainPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    pathMatch: 'full',
    resolve: { artObjectList: ArtObjectListResolver }
  }, {
    path: 'details/:id',
    component: DetailsPageComponent,
    resolve: { artObject: ArtObjectResolver }
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
