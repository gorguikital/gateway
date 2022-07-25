import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITuteur, Tuteur } from 'app/shared/model/inscriptiondb/tuteur.model';
import { TuteurService } from './tuteur.service';

@Component({
  selector: 'jhi-tuteur-update',
  templateUrl: './tuteur-update.component.html',
})
export class TuteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    prenom: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    adresse: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    email: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    sexe: [null, [Validators.required]],
  });

  constructor(protected tuteurService: TuteurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tuteur }) => {
      this.updateForm(tuteur);
    });
  }

  updateForm(tuteur: ITuteur): void {
    this.editForm.patchValue({
      id: tuteur.id,
      nom: tuteur.nom,
      prenom: tuteur.prenom,
      adresse: tuteur.adresse,
      email: tuteur.email,
      sexe: tuteur.sexe,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tuteur = this.createFromForm();
    if (tuteur.id !== undefined) {
      this.subscribeToSaveResponse(this.tuteurService.update(tuteur));
    } else {
      this.subscribeToSaveResponse(this.tuteurService.create(tuteur));
    }
  }

  private createFromForm(): ITuteur {
    return {
      ...new Tuteur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      email: this.editForm.get(['email'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITuteur>>): void {
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
