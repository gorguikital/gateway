import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaydbTestModule } from '../../../../test.module';
import { GroupeTransportDetailComponent } from 'app/entities/transportdb/groupe-transport/groupe-transport-detail.component';
import { GroupeTransport } from 'app/shared/model/transportdb/groupe-transport.model';

describe('Component Tests', () => {
  describe('GroupeTransport Management Detail Component', () => {
    let comp: GroupeTransportDetailComponent;
    let fixture: ComponentFixture<GroupeTransportDetailComponent>;
    const route = ({ data: of({ groupeTransport: new GroupeTransport(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaydbTestModule],
        declarations: [GroupeTransportDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GroupeTransportDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupeTransportDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load groupeTransport on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupeTransport).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
