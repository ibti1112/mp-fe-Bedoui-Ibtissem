/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'produits', component: ProduitsComponent }, // Correction du chemin ici
  { path: 'ajouterProduit', component: AjoutProduitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path:"accueil", component: AccueilComponent},
  { path:"produits",component: ProduitsComponent},
  { path:"ajouterProduit",component:AjoutProduitComponent},
  { path:"ajouterCategorie",component:CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
