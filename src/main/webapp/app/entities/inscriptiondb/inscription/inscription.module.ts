import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaydbSharedModule } from 'app/shared/shared.module';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail.component';
import { InscriptionUpdateComponent } from './inscription-update.component';
import { InscriptionDeleteDialogComponent } from './inscription-delete-dialog.component';
import { inscriptionRoute } from './inscription.route';

@NgModule({
  imports: [GatewaydbSharedModule, RouterModule.forChild(inscriptionRoute)],
  declarations: [InscriptionComponent, InscriptionDetailComponent, InscriptionUpdateComponent, InscriptionDeleteDialogComponent],
  entryComponents: [InscriptionDeleteDialogComponent],
})
export class InscriptiondbInscriptionModule {}
