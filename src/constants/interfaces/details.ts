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
}

export interface Color {
  available: boolean;
  color: string;
  photo: string | null;
  _id: string;
}

export interface ProductNameAndId {
  title: string;
  id: string;
}
