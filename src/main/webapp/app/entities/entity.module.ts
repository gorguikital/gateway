import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'salle',
        loadChildren: () => import('./immobiliedb/salle/salle.module').then(m => m.ImmobiliedbSalleModule),
      },
      {
        path: 'batiment',
        loadChildren: () => import('./immobiliedb/batiment/batiment.module').then(m => m.ImmobiliedbBatimentModule),
      },
      {
        path: 'cantine',
        loadChildren: () => import('./cantinedb/cantine/cantine.module').then(m => m.CantinedbCantineModule),
      },
      {
        path: 'groupe-cantine',
        loadChildren: () => import('./cantinedb/groupe-cantine/groupe-cantine.module').then(m => m.CantinedbGroupeCantineModule),
      },
      {
        path: 'groupe-transport',
        loadChildren: () => import('./transportdb/groupe-transport/groupe-transport.module').then(m => m.TransportdbGroupeTransportModule),
      },
      {
        path: 'chauffeur',
        loadChildren: () => import('./transportdb/chauffeur/chauffeur.module').then(m => m.TransportdbChauffeurModule),
      },
      {
        path: 'bus',
        loadChildren: () => import('./transportdb/bus/bus.module').then(m => m.TransportdbBusModule),
      },
      {
        path: 'tuteur',
        loadChildren: () => import('./inscriptiondb/tuteur/tuteur.module').then(m => m.InscriptiondbTuteurModule),
      },
      {
        path: 'annee',
        loadChildren: () => import('./inscriptiondb/annee/annee.module').then(m => m.InscriptiondbAnneeModule),
      },
      {
        path: 'eleve',
        loadChildren: () => import('./inscriptiondb/eleve/eleve.module').then(m => m.InscriptiondbEleveModule),
      },
      {
        path: 'inscription',
        loadChildren: () => import('./inscriptiondb/inscription/inscription.module').then(m => m.InscriptiondbInscriptionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewaydbEntityModule {}
