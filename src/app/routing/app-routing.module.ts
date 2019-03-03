import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from 'src/app/components/pages/main/main-page.component';
import { DetailsPageComponent } from 'src/app/components/pages/details/details-page.component';
import { ArtObjectResolver } from 'src/app/routing/resolvers/art-object.resolver';
import { ArtObjectListResolver } from 'src/app/routing/resolvers/art-object-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    pathMatch: 'full',
    resolve: { artObjectList: ArtObjectListResolver }
  },
  {
    path: 'favorites',
    component: MainPageComponent,
    runGuardsAndResolvers: 'always',
    data: { onlyFavorites: true },
    resolve: { artObjectList: ArtObjectListResolver }
  },
  {
    path: 'details/:id',
    component: DetailsPageComponent,
    resolve: { artObject: ArtObjectResolver }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
