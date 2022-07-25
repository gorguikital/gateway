import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ChauffeurService } from 'app/entities/transportdb/chauffeur/chauffeur.service';
import { IChauffeur, Chauffeur } from 'app/shared/model/transportdb/chauffeur.model';

describe('Service Tests', () => {
  describe('Chauffeur Service', () => {
    let injector: TestBed;
    let service: ChauffeurService;
    let httpMock: HttpTestingController;
    let elemDefault: IChauffeur;
    let expectedResult: IChauffeur | IChauffeur[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ChauffeurService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Chauffeur(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Chauffeur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
          },
          returnedFromService
        );

        service.create(new Chauffeur()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Chauffeur', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            lieuNaiss: 'BBBBBB',
            adresse: 'BBBBBB',
            telephone: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Chauffeur', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            lieuNaiss: 'BBBBBB',
            adresse: 'BBBBBB',
            telephone: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Chauffeur', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
