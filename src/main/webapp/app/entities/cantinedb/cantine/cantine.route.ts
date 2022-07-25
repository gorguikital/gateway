import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICantine, Cantine } from 'app/shared/model/cantinedb/cantine.model';
import { CantineService } from './cantine.service';
import { CantineComponent } from './cantine.component';
import { CantineDetailComponent } from './cantine-detail.component';
import { CantineUpdateComponent } from './cantine-update.component';

@Injectable({ providedIn: 'root' })
export class CantineResolve implements Resolve<ICantine> {
  constructor(private service: CantineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICantine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cantine: HttpResponse<Cantine>) => {
          if (cantine.body) {
            return of(cantine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cantine());
  }
}

export const cantineRoute: Routes = [
  {
    path: '',
    component: CantineComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaydbApp.cantinedbCantine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantineDetailComponent,
    resolve: {
      cantine: CantineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaydbApp.cantinedbCantine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'new',
    component: CantineUpdateComponent,
    resolve: {
      cantine: CantineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaydbApp.cantinedbCantine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantineUpdateComponent,
    resolve: {
      cantine: CantineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaydbApp.cantinedbCantine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
