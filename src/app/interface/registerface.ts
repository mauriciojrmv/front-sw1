export interface RegisterFace {
    msg:  string;
    body: BodyFace;
}

export interface BodyFace {
  status:      string;
  uuid:        string;
  name:        string;
  faces:       Face[];
  collections: any[];
}
export interface Face {
  uuid: string;
  url:  string;
}
