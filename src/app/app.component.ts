/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions: Array<any> = [
    { titre: "Accueil", route: "/accueil", icon: 'bi bi-house-door-fill' },
    { titre: "Liste des produits", route: "/produits", icon: 'bi bi-card-checklist' },
    { titre: "Ajouter Produit", route: "/ajouterProduit", icon: 'bi bi-patch-plus' }
  ];
  
  actionCourante: any;
  
  getIconName(titre: string): string {
    const action = this.actions.find(a => a.titre === titre);
    return action ? action.icon : '';
  }
  //constructor() {
    // Initialisez vos propriétés ici si nécessaire
  //}

  setActionCourante(a: any) {
    this.actionCourante = a;
  }
  
  title = 'ng-gestion-produits';
}*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions:Array<any> =
  [
    { titre:"Accueil", route:"/acceuil", icone: 'bi bi-house'},
    { titre:"Liste des produits", route:"/produits" , icone: 'bi bi-list' },
    { titre:"Ajouter Produit", route:"/ajouterProduit", icone: 'bi bi-plus' },
    { titre: "Ajouter Catégorie", route: "/ajouterCategorie", icone: 'bi bi-plus-square-fill' }
  ]

  actionCourante:any;

  setActionCourante(a :any){
    this.actionCourante=a;
  }
}