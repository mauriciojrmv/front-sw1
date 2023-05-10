export interface Face {
    msg?:  string;
    body?: Body[];
}

export interface Body {
  name?:        string;
  probability?: number;
  rectangle?:   Rectangle;
  uuid?:        string;
  collections?: any[];
}

export interface Rectangle {
    left?:   number;
    top?:    number;
    right?:  number;
    bottom?: number;
}
