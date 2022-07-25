import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEleve, Eleve } from 'app/shared/model/inscriptiondb/eleve.model';
import { EleveService } from './eleve.service';
import { ITuteur } from 'app/shared/model/inscriptiondb/tuteur.model';
import { TuteurService } from 'app/entities/inscriptiondb/tuteur/tuteur.service';

@Component({
  selector: 'jhi-eleve-update',
  templateUrl: './eleve-update.component.html',
})
export class EleveUpdateComponent implements OnInit {
  isSaving = false;
  tuteurs: ITuteur[] = [];

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    prenom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    sexe: [null, [Validators.required]],
    adresse: [null, [Validators.required, Validators.maxLength(255)]],
    telephone: [null, [Validators.required, Validators.maxLength(9)]],
    email: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    dateNaissance: [null, [Validators.required]],
    lieuNaissance: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    idTransport: [],
    idCantine: [],
    tuteurId: [],
  });

  constructor(
    protected eleveService: EleveService,
    protected tuteurService: TuteurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eleve }) => {
      if (!eleve.id) {
        const today = moment().startOf('day');
        eleve.dateNaissance = today;
      }

      this.updateForm(eleve);

      this.tuteurService.query().subscribe((res: HttpResponse<ITuteur[]>) => (this.tuteurs = res.body || []));
    });
  }

  updateForm(eleve: IEleve): void {
    this.editForm.patchValue({
      id: eleve.id,
      matricule: eleve.matricule,
      nom: eleve.nom,
      prenom: eleve.prenom,
      sexe: eleve.sexe,
      adresse: eleve.adresse,
      telephone: eleve.telephone,
      email: eleve.email,
      dateNaissance: eleve.dateNaissance ? eleve.dateNaissance.format(DATE_TIME_FORMAT) : null,
      lieuNaissance: eleve.lieuNaissance,
      idTransport: eleve.idTransport,
      idCantine: eleve.idCantine,
      tuteurId: eleve.tuteurId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eleve = this.createFromForm();
    if (eleve.id !== undefined) {
      this.subscribeToSaveResponse(this.eleveService.update(eleve));
    } else {
      this.subscribeToSaveResponse(this.eleveService.create(eleve));
    }
  }

  private createFromForm(): IEleve {
    return {
      ...new Eleve(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      email: this.editForm.get(['email'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value
        ? moment(this.editForm.get(['dateNaissance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      idTransport: this.editForm.get(['idTransport'])!.value,
      idCantine: this.editForm.get(['idCantine'])!.value,
      tuteurId: this.editForm.get(['tuteurId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEleve>>): void {
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

  trackById(index: number, item: ITuteur): any {
    return item.id;
  }
}
