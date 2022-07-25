export interface IGroupeTransport {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  etat?: boolean;
  busId?: number;
}

export class GroupeTransport implements IGroupeTransport {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public etat?: boolean, public busId?: number) {
    this.etat = this.etat || false;
  }
}
