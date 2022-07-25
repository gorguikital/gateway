import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface ITuteur {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  email?: string;
  sexe?: Sexe;
}

export class Tuteur implements ITuteur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public adresse?: string,
    public email?: string,
    public sexe?: Sexe
  ) {}
}
