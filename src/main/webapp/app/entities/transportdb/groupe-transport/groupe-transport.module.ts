import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaydbSharedModule } from 'app/shared/shared.module';
import { GroupeTransportComponent } from './groupe-transport.component';
import { GroupeTransportDetailComponent } from './groupe-transport-detail.component';
import { GroupeTransportUpdateComponent } from './groupe-transport-update.component';
import { GroupeTransportDeleteDialogComponent } from './groupe-transport-delete-dialog.component';
import { groupeTransportRoute } from './groupe-transport.route';

@NgModule({
  imports: [GatewaydbSharedModule, RouterModule.forChild(groupeTransportRoute)],
  declarations: [
    GroupeTransportComponent,
    GroupeTransportDetailComponent,
    GroupeTransportUpdateComponent,
    GroupeTransportDeleteDialogComponent,
  ],
  entryComponents: [GroupeTransportDeleteDialogComponent],
})
export class TransportdbGroupeTransportModule {}
