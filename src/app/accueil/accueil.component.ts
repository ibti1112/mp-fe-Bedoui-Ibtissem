import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

}




/*import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  actionCourante: any; // Définir la propriété actionCourante
  actions: any[] = []; // Définir la propriété actions
  
  constructor() {
    // Initialisation des actions
    this.actions = [
      { titre: 'Action 1', route: '/action1' },
      { titre: 'Action 2', route: '/action2' },
      // Ajoutez d'autres actions si nécessaire
    ];
  }
  
  // Définir la méthode setActionCourante
  setActionCourante(action: any) {
    this.actionCourante = action;
    // Implémentez ici la logique pour définir l'action courante
  }

  // Définir la méthode getIconName
  getIconName(titre: string): string {
    // Implémentez ici la logique pour obtenir le nom de l'icône en fonction du titre
    return ''; // Remplacez cette ligne avec votre logique réelle
  }
}*/