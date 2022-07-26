import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaydbTestModule } from '../../../../test.module';
import { ProfileDetailComponent } from 'app/entities/utilisateurdb/profile/profile-detail.component';
import { Profile } from 'app/shared/model/utilisateurdb/profile.model';

describe('Component Tests', () => {
  describe('Profile Management Detail Component', () => {
    let comp: ProfileDetailComponent;
    let fixture: ComponentFixture<ProfileDetailComponent>;
    const route = ({ data: of({ profile: new Profile(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaydbTestModule],
        declarations: [ProfileDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
