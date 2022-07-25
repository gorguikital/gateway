import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChauffeur } from 'app/shared/model/transportdb/chauffeur.model';

@Component({
  selector: 'jhi-chauffeur-detail',
  templateUrl: './chauffeur-detail.component.html',
})
export class ChauffeurDetailComponent implements OnInit {
  chauffeur: IChauffeur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chauffeur }) => (this.chauffeur = chauffeur));
  }

  previousState(): void {
    window.history.back();
  }
}
