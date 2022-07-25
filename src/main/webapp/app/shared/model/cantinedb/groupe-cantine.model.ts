export interface IGroupeCantine {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  etat?: boolean;
  cantineId?: number;
}

export class GroupeCantine implements IGroupeCantine {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public etat?: boolean, public cantineId?: number) {
    this.etat = this.etat || false;
  }
}
