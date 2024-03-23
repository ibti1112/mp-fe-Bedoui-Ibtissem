/*import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitCourant: Produit = new Produit();
  containerClass: string = 'container';


  constructor(private produitsService: ProduitsService, 
    private http: HttpClient)
   {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("Succès GET");
        this.produits = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }

  supprimerProduit(p: Produit) {
    if (p.id !== undefined) {
      const confirmDelete = confirm(`Voulez-vous supprimer le produit : ${p.designation} ?`);
      if (confirmDelete) {
        this.envoyerRequeteDelete(p);
      }
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  private envoyerRequeteDelete(product: Produit) {
    if (product.id !== undefined) {
      this.produitsService.deleteProduit(product.id).subscribe({
        next: () => {
          console.log('Succès DELETE', product);
          const index = this.produits.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.produits.splice(index, 1);
          }
          this.effacerSaisie(); // Effacer la saisie après la suppression
        },
        error: error => {
          console.error('Erreur DELETE', error);
        }
      });
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  editerProduit(p: Produit) {
    console.log("Editer le produit : ", p);
    this.produitCourant = { ...p }; // Cloner l'objet pour éviter de modifier directement l'objet dans la liste
  }

  effacerSaisie() {
    console.log("Effacer la saisie");
    this.produitCourant = new Produit();
  }

  /*produitExiste(id: number): boolean {
    console.log(`Vérifier si le produit avec l'ID ${id} existe`);
    return this.produits.some(p => p.id === id);
  }*/
 /* produitExiste(id: number): boolean {
    return this.produits.some(p => p.id === id);
}
  validerFormulaire(form: NgForm) {
    console.log(form.value);
    // pour vérifier si l'ID existe déjà dans la liste
    const existingProduct = this.produits.find(p => p.id === form.value.id);

    if (existingProduct) {
      // Afficher une boîte de dialogue pour confirmer la mise à jour
      const reponse: boolean = confirm("Vérifier votre ID!... Voulez-vous mettre à jour le produit existant ?");
      
      if (reponse) {
        console.log("Mise à jour confirmée...");
        // Mettre à jour les propriétés du produit existant avec les nouvelles valeurs
        existingProduct.code = form.value.code;
        existingProduct.designation = form.value.designation;
        existingProduct.prix = form.value.prix;
      } else {
        console.log("Mise à jour annulée...");
      }
    } else {
      console.log("Ajout avec succès!...");
      this.produits.push(form.value);
     //Faire l'ajout côté serveur avec une requête HTTP POST
      this.http.post<Produit>("http://localhost:9999/produits", form.value)
        .subscribe(addedProduct => {
          console.log('Ajout côté serveur réussi', addedProduct);
          this.produits.push(addedProduct);
        }, error => {
          console.error('Erreur lors de l\'ajout côté serveur', error);
        });
    }
    
    
  }

  private ajouterProduit(newProduct: Produit) {
    this.produitsService.addProduit(newProduct).subscribe({
      next: (addedProduct: Produit) => {
        console.log('Succès POST', addedProduct);
        this.produits.push(addedProduct);
        this.effacerSaisie();
      },
      error: error => {
        console.error('Erreur POST', error);
      }
    });
  }
  private mettreAJourProduit(updatedProduct: Produit) {
    console.log('Mise à jour du produit : ', updatedProduct);
}
}
/*import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = []; // Liste des catégories
  produits: Produit[] = []; // Liste des produits
  produitCourant = new Produit(); // Produit en cours d'édition
  categorieFiltre: number | undefined; // Catégorie sélectionnée pour le filtrage
  editMode: boolean = false; // Mode édition activé ou désactivé
  showForm: boolean = false; // Affichage du formulaire activé ou désactivé

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits(); // Charger les produits au démarrage
    this.consulterCategories(); // Charger les catégories au démarrage
  }

  // Méthode appelée lors du changement de la catégorie de filtrage
  lancerRecherche() {
    this.rechercherParCategorie();
  }

  // Filtrer les produits par catégorie
  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      // Appel au service pour récupérer les produits par catégorie
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: Produit[]) => {
          this.produits = produits; // Mettre à jour la liste des produits filtrés
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      this.consulterProduits(); // Si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  // Mettre à jour un produit existant
  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        // Mettre à jour l'ancien produit avec les données mises à jour
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
        this.annulerEdition(); // Réinitialiser le formulaire après la mise à jour
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

  // Supprimer un produit
  supprimerProduit(p: Produit) {
    const confirmation = confirm("Voulez-vous supprimer le produit :"+p.designation+" ?");
    if (confirmation) {
      console.log("Suppression confirmée...");
      const index = this.produits.indexOf(p);
      if (index !== -1) {
        // Appel au service pour supprimer le produit
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits.splice(index, 1); // Supprimer le produit de la liste affichée
            console.log("Suppression du produit:"+p.designation);
          },
          error: (err: any) => {
            console.error("Erreur DELETE", err);
          }
        });
      }
    } else {
      console.log("Suppression annulée...");
    }
  }

  // Valider le formulaire de produit
  validerFormulaire(produitForm: NgForm) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);
      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");
        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
          this.showForm = false; // Fermer le formulaire après la validation
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

  // Valider l'édition du produit
  validerEditionProduit() {
    // Vérifier si le formulaire est valide
    if (this.produitCourant && this.produitCourant.id) {
      // Appeler le service pour mettre à jour le produit
      this.produitsService.updateProduit(this.produitCourant.id, this.produitCourant).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          // Mettre à jour le produit dans la liste affichée
          const index = this.produits.findIndex(p => p.id === updatedProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduit;
          }
          // Réinitialiser le formulaire et désactiver le mode édition
          this.annulerEdition();
        },
        error: err => {
          console.error("Erreur PUT:", err);
        }
      });
    } else {
      console.error("Impossible de valider l'édition du produit: ID non défini");
    }
  }

  // Activer le mode édition pour un produit
  editerProduit(produit: any) {
    this.produitCourant = produit;
    this.editMode = true;
    this.showForm = true;
  }

  // Annuler l'édition du produit
  annulerEdition() {
    this.editMode = false;
    this.produitCourant = new Produit();
  }

  // Effacer les saisies du formulaire de produit
  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new Produit();
    produitForm.resetForm();
  }

  // Charger tous les produits
  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits; // Mettre à jour la liste des produits
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }

  // Charger toutes les catégories
  consulterCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories; // Mettre à jour la liste des catégories
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = []; // Liste des catégories
  produits: Produit[] = []; // Liste des produits
  produitCourant = new Produit(); // Produit en cours d'édition
  categorieFiltre: number | undefined; // Catégorie sélectionnée pour le filtrage
  editMode: boolean = false; // Mode édition activé ou désactivé
  showForm: boolean = false; // Affichage du formulaire activé ou désactivé

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits(); // Charger les produits au démarrage
    this.consulterCategories(); // Charger les catégories au démarrage
  }

  // Méthode appelée lors du changement de la catégorie de filtrage
  lancerRecherche() {
    this.rechercherParCategorie();
  }

  // Filtrer les produits par catégorie
  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      // Appel au service pour récupérer les produits par catégorie
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: Produit[]) => {
          this.produits = produits; // Mettre à jour la liste des produits filtrés
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      this.consulterProduits(); // Si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  // Mettre à jour un produit existant
  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        // Mettre à jour l'ancien produit avec les données mises à jour
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
        this.annulerEdition(); // Réinitialiser le formulaire après la mise à jour
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

  // Supprimer un produit
  supprimerProduit(p: Produit) {
    const confirmation = confirm("Voulez-vous supprimer le produit :"+p.designation+" ?");
    if (confirmation) {
      console.log("Suppression confirmée...");
      const index = this.produits.indexOf(p);
      if (index !== -1) {
        // Appel au service pour supprimer le produit
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits.splice(index, 1); // Supprimer le produit de la liste affichée
            console.log("Suppression du produit:"+p.designation);
          },
          error: (err: any) => {
            console.error("Erreur DELETE", err);
          }
        });
      }
    } else {
      console.log("Suppression annulée...");
    }
  }

  // Valider le formulaire de produit
  validerFormulaire(produitForm: NgForm) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);
      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");
        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
          this.showForm = false; // Fermer le formulaire après la validation
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

  // Valider l'édition du produit
  validerEditionProduit() {
    // Vérifier si le formulaire est valide
    if (this.produitCourant && this.produitCourant.id) {
      // Appeler le service pour mettre à jour le produit
      this.produitsService.updateProduit(this.produitCourant.id, this.produitCourant).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          // Mettre à jour le produit dans la liste affichée
          const index = this.produits.findIndex(p => p.id === updatedProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduit;
          }
          // Réinitialiser le formulaire et désactiver le mode édition
          this.annulerEdition();
        },
        error: err => {
          console.error("Erreur PUT:", err);
        }
      });
    } else {
      console.error("Impossible de valider l'édition du produit: ID non défini");
    }
  }

  // Activer le mode édition pour un produit
  editerProduit(produit: any) {
    this.produitCourant = produit;
    this.editMode = true;
    this.showForm = true;
  }

  // Annuler l'édition du produit
  annulerEdition() {
    this.editMode = false;
    this.produitCourant = new Produit();
  }

  // Effacer les saisies du formulaire de produit
  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new Produit();
    produitForm.resetForm();
  }

  // Charger tous les produits
  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits; // Mettre à jour la liste des produits
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }

  // Charger toutes les catégories
  consulterCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories; // Mettre à jour la liste des catégories
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = []; // Liste des catégories
  produits: Produit[] = []; // Liste des produits
  produitCourant = new Produit(); // Produit en cours d'édition
  categorieFiltre: number | undefined; // Catégorie sélectionnée pour le filtrage
  editMode: boolean = false; // Mode édition activé ou désactivé
  showForm: boolean = false; // Affichage du formulaire activé ou désactivé

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits(); // Charger les produits au démarrage
    this.consulterCategories(); // Charger les catégories au démarrage
  }

  // Méthode appelée lors du changement de la catégorie de filtrage
  lancerRecherche() {
    this.rechercherParCategorie();
  }

  // Filtrer les produits par catégorie
  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      // Appel au service pour récupérer les produits par catégorie
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: Produit[]) => {
          this.produits = produits; // Mettre à jour la liste des produits filtrés
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      this.consulterProduits(); // Si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  // Mettre à jour un produit existant
  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        // Mettre à jour l'ancien produit avec les données mises à jour
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
        this.annulerEdition(); // Réinitialiser le formulaire après la mise à jour
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

  // Supprimer un produit
  supprimerProduit(p: Produit) {
    const confirmation = confirm("Voulez-vous supprimer le produit :"+p.designation+" ?");
    if (confirmation) {
      console.log("Suppression confirmée...");
      const index = this.produits.indexOf(p);
      if (index !== -1) {
        // Appel au service pour supprimer le produit
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits.splice(index, 1); // Supprimer le produit de la liste affichée
            console.log("Suppression du produit:"+p.designation);
          },
          error: (err: any) => {
            console.error("Erreur DELETE", err);
          }
        });
      }
    } else {
      console.log("Suppression annulée...");
    }
  }

  // Valider le formulaire de produit
  validerFormulaire(produitForm: NgForm) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);
      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");
        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
          this.showForm = false; // Fermer le formulaire après la validation
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

  // Valider l'édition du produit
  validerEditionProduit() {
    // Vérifier si le formulaire est valide
    if (this.produitCourant && this.produitCourant.id) {
      // Appeler le service pour mettre à jour le produit
      this.produitsService.updateProduit(this.produitCourant.id, this.produitCourant).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          // Mettre à jour le produit dans la liste affichée
          const index = this.produits.findIndex(p => p.id === updatedProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduit;
          }
          // Réinitialiser le formulaire et désactiver le mode édition
          this.annulerEdition();
        },
        error: err => {
          console.error("Erreur PUT:", err);
        }
      });
    } else {
      console.error("Impossible de valider l'édition du produit: ID non défini");
    }
  }

  // Activer le mode édition pour un produit
  editerProduit(produit: any) {
    this.produitCourant = produit;
    this.editMode = true;
    this.showForm = true;
  }

  // Annuler l'édition du produit
  annulerEdition() {
    this.editMode = false;
    this.produitCourant = new Produit();
  }

  // Effacer les saisies du formulaire de produit
  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new Produit();
    produitForm.resetForm();
  }

  // Charger tous les produits
  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits; // Mettre à jour la liste des produits
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }

  // Charger toutes les catégories
  consulterCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories; // Mettre à jour la liste des catégories
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitCourant: Produit = new Produit();
  containerClass: string = 'container';


  constructor(private produitsService: ProduitsService, 
    private http: HttpClient)
   {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("Succès GET");
        this.produits = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }

  supprimerProduit(p: Produit) {
    if (p.id !== undefined) {
      const confirmDelete = confirm(`Voulez-vous supprimer le produit : ${p.designation} ?`);
      if (confirmDelete) {
        this.envoyerRequeteDelete(p);
      }
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  private envoyerRequeteDelete(product: Produit) {
    if (product.id !== undefined) {
      this.produitsService.deleteProduit(product.id).subscribe({
        next: () => {
          console.log('Succès DELETE', product);
          const index = this.produits.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.produits.splice(index, 1);
          }
          this.effacerSaisie(); // Effacer la saisie après la suppression
        },
        error: error => {
          console.error('Erreur DELETE', error);
        }
      });
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  editerProduit(p: Produit) {
    console.log("Editer le produit : ", p);
    this.produitCourant = { ...p }; // Cloner l'objet pour éviter de modifier directement l'objet dans la liste
  }

  effacerSaisie() {
    console.log("Effacer la saisie");
    this.produitCourant = new Produit();
  }

  /*produitExiste(id: number): boolean {
    console.log(`Vérifier si le produit avec l'ID ${id} existe`);
    return this.produits.some(p => p.id === id);
  }*/
  /*produitExiste(id: number): boolean {
    return this.produits.some(p => p.id === id);
}
  validerFormulaire(form: NgForm) {
    console.log(form.value);
    // pour vérifier si l'ID existe déjà dans la liste
    const existingProduct = this.produits.find(p => p.id === form.value.id);

    if (existingProduct) {
      // Afficher une boîte de dialogue pour confirmer la mise à jour
      const reponse: boolean = confirm("Vérifier votre ID!... Voulez-vous mettre à jour le produit existant ?");
      
      if (reponse) {
        console.log("Mise à jour confirmée...");
        // Mettre à jour les propriétés du produit existant avec les nouvelles valeurs
        existingProduct.code = form.value.code;
        existingProduct.designation = form.value.designation;
        existingProduct.prix = form.value.prix;
      } else {
        console.log("Mise à jour annulée...");
      }
    } else {
      console.log("Ajout avec succès!...");
      this.produits.push(form.value);
     //Faire l'ajout côté serveur avec une requête HTTP POST
      this.http.post<Produit>("http://localhost:3333/produits", form.value)
        .subscribe(addedProduct => {
          console.log('Ajout côté serveur réussi', addedProduct);
          this.produits.push(addedProduct);
        }, error => {
          console.error('Erreur lors de l\'ajout côté serveur', error);
        });
    }
    
    
  }

  private ajouterProduit(newProduct: Produit) {
    this.produitsService.addProduit(newProduct).subscribe({
      next: (addedProduct: Produit) => {
        console.log('Succès POST', addedProduct);
        this.produits.push(addedProduct);
        this.effacerSaisie();
      },
      error: error => {
        console.error('Erreur POST', error);
      }
    });
  }
  private mettreAJourProduit(updatedProduct: Produit) {
    console.log('Mise à jour du produit : ', updatedProduct);
}
}*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';
import { CategoriesService } from '../services/categories.service'; // Importer le service de catégories
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = [];
  produits: Produit[] = [];
  produitCourant: Produit = new Produit();
  categorieFiltre: number | undefined; // Catégorie sélectionnée pour le filtrage
  editMode: boolean = false; // Ajout de la propriété editMode
  showForm: boolean = false; // Ajout de la propriété showForm

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService // Injection du service de catégories
  ) {}

  ngOnInit(): void {
    this.consulterProduits();
    this.consulterCategories(); // Appel à la méthode pour charger les catégories
  }

  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: data => {
        this.produits = data;
      },
      error: err => {
        console.error('Erreur GET', err);
      }
    });
  }

  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      // Appel au service pour récupérer les produits par catégorie
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: Produit[]) => {
          this.produits = produits; // Mettre à jour la liste des produits filtrés
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      this.consulterProduits(); // Si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
        this.annulerEdition();
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

  supprimerProduit(p: Produit) {
    const confirmation = confirm("Voulez-vous supprimer le produit :"+p.designation+" ?");
    if (confirmation) {
      console.log("Suppression confirmée...");
      const index = this.produits.indexOf(p);
      if (index !== -1) {
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits.splice(index, 1);
            console.log("Suppression du produit:"+p.designation);
          },
          error: (err: any) => {
            console.error("Erreur DELETE", err);
          }
        });
      }
    } else {
      console.log("Suppression annulée...");
    }
  }

  validerFormulaire(produitForm: NgForm) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);
      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");
        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
          this.showForm = false; // Fermer le formulaire après la validation
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

  validerEditionProduit() {
    if (this.produitCourant && this.produitCourant.id) {
      this.produitsService.updateProduit(this.produitCourant.id, this.produitCourant).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          const index = this.produits.findIndex(p => p.id === updatedProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduit;
          }
          this.annulerEdition();
        },
        error: err => {
          console.error("Erreur PUT:", err);
        }
      });
    } else {
      console.error("Impossible de valider l'édition du produit: ID non défini");
    }
  }

  editerProduit(produit: Produit) {
    this.produitCourant = produit;
    this.editMode = true;
    this.showForm = true;
  }

  annulerEdition() {
    this.editMode = false;
    this.produitCourant = new Produit();
  }

  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new Produit();
    produitForm.resetForm();
  }

  consulterCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories; // Mettre à jour la liste des catégories
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}