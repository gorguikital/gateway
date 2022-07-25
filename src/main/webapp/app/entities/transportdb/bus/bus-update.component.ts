import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBus, Bus } from 'app/shared/model/transportdb/bus.model';
import { BusService } from './bus.service';
import { IChauffeur } from 'app/shared/model/transportdb/chauffeur.model';
import { ChauffeurService } from 'app/entities/transportdb/chauffeur/chauffeur.service';

@Component({
  selector: 'jhi-bus-update',
  templateUrl: './bus-update.component.html',
})
export class BusUpdateComponent implements OnInit {
  isSaving = false;
  chauffeurs: IChauffeur[] = [];

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    nombreplace: [null, [Validators.required]],
    chauffeurId: [],
  });

  constructor(
    protected busService: BusService,
    protected chauffeurService: ChauffeurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bus }) => {
      this.updateForm(bus);

      this.chauffeurService.query().subscribe((res: HttpResponse<IChauffeur[]>) => (this.chauffeurs = res.body || []));
    });
  }

  updateForm(bus: IBus): void {
    this.editForm.patchValue({
      id: bus.id,
      matricule: bus.matricule,
      numero: bus.numero,
      nombreplace: bus.nombreplace,
      chauffeurId: bus.chauffeurId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bus = this.createFromForm();
    if (bus.id !== undefined) {
      this.subscribeToSaveResponse(this.busService.update(bus));
    } else {
      this.subscribeToSaveResponse(this.busService.create(bus));
    }
  }

  private createFromForm(): IBus {
    return {
      ...new Bus(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      nombreplace: this.editForm.get(['nombreplace'])!.value,
      chauffeurId: this.editForm.get(['chauffeurId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBus>>): void {
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

  trackById(index: number, item: IChauffeur): any {
    return item.id;
  }
}
