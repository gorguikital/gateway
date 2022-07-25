import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGroupeTransport, GroupeTransport } from 'app/shared/model/transportdb/groupe-transport.model';
import { GroupeTransportService } from './groupe-transport.service';
import { IBus } from 'app/shared/model/transportdb/bus.model';
import { BusService } from 'app/entities/transportdb/bus/bus.service';

@Component({
  selector: 'jhi-groupe-transport-update',
  templateUrl: './groupe-transport-update.component.html',
})
export class GroupeTransportUpdateComponent implements OnInit {
  isSaving = false;
  buses: IBus[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    nombreEleves: [null, [Validators.required]],
    etat: [],
    busId: [],
  });

  constructor(
    protected groupeTransportService: GroupeTransportService,
    protected busService: BusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupeTransport }) => {
      this.updateForm(groupeTransport);

      this.busService.query().subscribe((res: HttpResponse<IBus[]>) => (this.buses = res.body || []));
    });
  }

  updateForm(groupeTransport: IGroupeTransport): void {
    this.editForm.patchValue({
      id: groupeTransport.id,
      nom: groupeTransport.nom,
      nombreEleves: groupeTransport.nombreEleves,
      etat: groupeTransport.etat,
      busId: groupeTransport.busId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupeTransport = this.createFromForm();
    if (groupeTransport.id !== undefined) {
      this.subscribeToSaveResponse(this.groupeTransportService.update(groupeTransport));
    } else {
      this.subscribeToSaveResponse(this.groupeTransportService.create(groupeTransport));
    }
  }

  private createFromForm(): IGroupeTransport {
    return {
      ...new GroupeTransport(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombreEleves: this.editForm.get(['nombreEleves'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      busId: this.editForm.get(['busId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeTransport>>): void {
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

  trackById(index: number, item: IBus): any {
    return item.id;
  }
}
