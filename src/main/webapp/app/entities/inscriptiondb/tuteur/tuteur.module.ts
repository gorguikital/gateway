import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaydbSharedModule } from 'app/shared/shared.module';
import { TuteurComponent } from './tuteur.component';
import { TuteurDetailComponent } from './tuteur-detail.component';
import { TuteurUpdateComponent } from './tuteur-update.component';
import { TuteurDeleteDialogComponent } from './tuteur-delete-dialog.component';
import { tuteurRoute } from './tuteur.route';

@NgModule({
  imports: [GatewaydbSharedModule, RouterModule.forChild(tuteurRoute)],
  declarations: [TuteurComponent, TuteurDetailComponent, TuteurUpdateComponent, TuteurDeleteDialogComponent],
  entryComponents: [TuteurDeleteDialogComponent],
})
export class InscriptiondbTuteurModule {}
