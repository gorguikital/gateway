import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInscription, Inscription } from 'app/shared/model/inscriptiondb/inscription.model';
import { InscriptionService } from './inscription.service';
import { IAnnee } from 'app/shared/model/inscriptiondb/annee.model';
import { AnneeService } from 'app/entities/inscriptiondb/annee/annee.service';
import { IEleve } from 'app/shared/model/inscriptiondb/eleve.model';
import { EleveService } from 'app/entities/inscriptiondb/eleve/eleve.service';

type SelectableEntity = IAnnee | IEleve;

@Component({
  selector: 'jhi-inscription-update',
  templateUrl: './inscription-update.component.html',
})
export class InscriptionUpdateComponent implements OnInit {
  isSaving = false;
  annees: IAnnee[] = [];
  eleves: IEleve[] = [];

  editForm = this.fb.group({
    id: [],
    dateInscription: [null, [Validators.required]],
    status: [null, [Validators.required]],
    idClasse: [],
    anneeId: [],
    eleveId: [],
  });

  constructor(
    protected inscriptionService: InscriptionService,
    protected anneeService: AnneeService,
    protected eleveService: EleveService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscription }) => {
      if (!inscription.id) {
        const today = moment().startOf('day');
        inscription.dateInscription = today;
      }

      this.updateForm(inscription);

      this.anneeService.query().subscribe((res: HttpResponse<IAnnee[]>) => (this.annees = res.body || []));

      this.eleveService.query().subscribe((res: HttpResponse<IEleve[]>) => (this.eleves = res.body || []));
    });
  }

  updateForm(inscription: IInscription): void {
    this.editForm.patchValue({
      id: inscription.id,
      dateInscription: inscription.dateInscription ? inscription.dateInscription.format(DATE_TIME_FORMAT) : null,
      status: inscription.status,
      idClasse: inscription.idClasse,
      anneeId: inscription.anneeId,
      eleveId: inscription.eleveId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscription = this.createFromForm();
    if (inscription.id !== undefined) {
      this.subscribeToSaveResponse(this.inscriptionService.update(inscription));
    } else {
      this.subscribeToSaveResponse(this.inscriptionService.create(inscription));
    }
  }

  private createFromForm(): IInscription {
    return {
      ...new Inscription(),
      id: this.editForm.get(['id'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value
        ? moment(this.editForm.get(['dateInscription'])!.value, DATE_TIME_FORMAT)
        : undefined,
      status: this.editForm.get(['status'])!.value,
      idClasse: this.editForm.get(['idClasse'])!.value,
      anneeId: this.editForm.get(['anneeId'])!.value,
      eleveId: this.editForm.get(['eleveId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
