import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChauffeur, Chauffeur } from 'app/shared/model/transportdb/chauffeur.model';
import { ChauffeurService } from './chauffeur.service';

@Component({
  selector: 'jhi-chauffeur-update',
  templateUrl: './chauffeur-update.component.html',
})
export class ChauffeurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    prenom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    dateNaiss: [null, [Validators.required]],
    lieuNaiss: [null, [Validators.required]],
    adresse: [],
    telephone: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(9)]],
  });

  constructor(protected chauffeurService: ChauffeurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chauffeur }) => {
      if (!chauffeur.id) {
        const today = moment().startOf('day');
        chauffeur.dateNaiss = today;
      }

      this.updateForm(chauffeur);
    });
  }

  updateForm(chauffeur: IChauffeur): void {
    this.editForm.patchValue({
      id: chauffeur.id,
      nom: chauffeur.nom,
      prenom: chauffeur.prenom,
      dateNaiss: chauffeur.dateNaiss ? chauffeur.dateNaiss.format(DATE_TIME_FORMAT) : null,
      lieuNaiss: chauffeur.lieuNaiss,
      adresse: chauffeur.adresse,
      telephone: chauffeur.telephone,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chauffeur = this.createFromForm();
    if (chauffeur.id !== undefined) {
      this.subscribeToSaveResponse(this.chauffeurService.update(chauffeur));
    } else {
      this.subscribeToSaveResponse(this.chauffeurService.create(chauffeur));
    }
  }

  private createFromForm(): IChauffeur {
    return {
      ...new Chauffeur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      dateNaiss: this.editForm.get(['dateNaiss'])!.value ? moment(this.editForm.get(['dateNaiss'])!.value, DATE_TIME_FORMAT) : undefined,
      lieuNaiss: this.editForm.get(['lieuNaiss'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChauffeur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
