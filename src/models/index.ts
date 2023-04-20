export interface IPerson {
  id: number;
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  height: string;
  mass: string;
}

export interface IPersonResponse {
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  height: string;
  hair_color: string;
  skin_color: string;
  mass: string;
  url: string;
}

export interface IPlanet {
  id: number;
  name: string;
  population: string;
  rotation_period: string;
  diameter: string;
  terrain: string;
}

export interface IPlanetResponse {
  name: string;
  population: string;
  rotation_period: string;
  diameter: string;
  terrain: string;
  url: string;
}


export interface IFilter {
  key: string;
  field: string;
}
