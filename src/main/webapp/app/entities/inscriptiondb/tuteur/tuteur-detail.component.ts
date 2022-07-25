import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITuteur } from 'app/shared/model/inscriptiondb/tuteur.model';

@Component({
  selector: 'jhi-tuteur-detail',
  templateUrl: './tuteur-detail.component.html',
})
export class TuteurDetailComponent implements OnInit {
  tuteur: ITuteur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tuteur }) => (this.tuteur = tuteur));
  }

  previousState(): void {
    window.history.back();
  }
}
