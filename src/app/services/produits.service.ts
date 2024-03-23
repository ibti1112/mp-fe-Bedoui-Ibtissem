import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/protuit';
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // URL du service web de gestion des produits
  // Commune pour toutes les méthodes
  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des produits
  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  // Méthode pour supprimer un produit en fonction de son ID
  deleteProduit(idP: number | undefined): Observable<any> {
    return this.http.delete(`${this.urlHote}${idP}`);
  }

  // Méthode pour ajouter un nouveau produit
  addProduit(nouveau: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlHote, nouveau);
  }

  // Méthode pour mettre à jour un produit existant en fonction de son ID
  updateProduit(idP: number | undefined, nouveau: Produit): Observable<Produit> {
    // Utilisation de la méthode put pour envoyer une requête PUT avec les données mises à jour
    return this.http.put<Produit>(`${this.urlHote}${idP}`, nouveau);
  }

  // Méthode pour récupérer la liste des produits d'une catégorie spécifique
  getProduitsParCategorie(categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlHote}par-categorie/${categorieId}`);
  }
}