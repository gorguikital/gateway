import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaydbTestModule } from '../../../../test.module';
import { TuteurDetailComponent } from 'app/entities/inscriptiondb/tuteur/tuteur-detail.component';
import { Tuteur } from 'app/shared/model/inscriptiondb/tuteur.model';

describe('Component Tests', () => {
  describe('Tuteur Management Detail Component', () => {
    let comp: TuteurDetailComponent;
    let fixture: ComponentFixture<TuteurDetailComponent>;
    const route = ({ data: of({ tuteur: new Tuteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaydbTestModule],
        declarations: [TuteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TuteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TuteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tuteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tuteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
