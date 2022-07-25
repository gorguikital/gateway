export interface ICantine {
  id?: number;
  libelle?: string;
  nombreGroupe?: number;
}

export class Cantine implements ICantine {
  constructor(public id?: number, public libelle?: string, public nombreGroupe?: number) {}
}
