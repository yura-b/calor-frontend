export interface Detail {
  materials: Materials[];
  photo: string | null;
  title: string;
  _id: string;
}

export interface Materials {
  colors: Color[];
  title: string;
  _id: string;
  additional: boolean;
  available: boolean;
}

export interface Color {
  available: boolean;
  color: string;
  _id: string;
  additional?: boolean;
}

export interface products {
  colors: Color[];
  title: string;
  _id: string;
}
