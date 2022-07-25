import { Moment } from 'moment';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface IEleve {
  id?: number;
  matricule?: string;
  nom?: string;
  prenom?: string;
  sexe?: Sexe;
  adresse?: string;
  telephone?: string;
  email?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  idTransport?: string;
  idCantine?: string;
  tuteurId?: number;
}

export class Eleve implements IEleve {
  constructor(
    public id?: number,
    public matricule?: string,
    public nom?: string,
    public prenom?: string,
    public sexe?: Sexe,
    public adresse?: string,
    public telephone?: string,
    public email?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public idTransport?: string,
    public idCantine?: string,
    public tuteurId?: number
  ) {}
}
