import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaydbSharedModule } from 'app/shared/shared.module';
import { GroupeCantineComponent } from './groupe-cantine.component';
import { GroupeCantineDetailComponent } from './groupe-cantine-detail.component';
import { GroupeCantineUpdateComponent } from './groupe-cantine-update.component';
import { GroupeCantineDeleteDialogComponent } from './groupe-cantine-delete-dialog.component';
import { groupeCantineRoute } from './groupe-cantine.route';

@NgModule({
  imports: [GatewaydbSharedModule, RouterModule.forChild(groupeCantineRoute)],
  declarations: [GroupeCantineComponent, GroupeCantineDetailComponent, GroupeCantineUpdateComponent, GroupeCantineDeleteDialogComponent],
  entryComponents: [GroupeCantineDeleteDialogComponent],
})
export class CantinedbGroupeCantineModule {}
