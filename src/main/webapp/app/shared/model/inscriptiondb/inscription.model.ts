import { Moment } from 'moment';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IInscription {
  id?: number;
  dateInscription?: Moment;
  status?: Status;
  idClasse?: string;
  anneeId?: number;
  eleveId?: number;
}

export class Inscription implements IInscription {
  constructor(
    public id?: number,
    public dateInscription?: Moment,
    public status?: Status,
    public idClasse?: string,
    public anneeId?: number,
    public eleveId?: number
  ) {}
}
