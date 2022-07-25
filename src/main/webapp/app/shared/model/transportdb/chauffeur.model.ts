import { Moment } from 'moment';

export interface IChauffeur {
  id?: number;
  nom?: string;
  prenom?: string;
  dateNaiss?: Moment;
  lieuNaiss?: string;
  adresse?: string;
  telephone?: string;
}

export class Chauffeur implements IChauffeur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public dateNaiss?: Moment,
    public lieuNaiss?: string,
    public adresse?: string,
    public telephone?: string
  ) {}
}
