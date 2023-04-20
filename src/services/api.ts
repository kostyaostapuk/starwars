import { IPerson, IPersonResponse, IPlanet, IPlanetResponse } from '../models';

class SwapiService {
  _apiBase = 'https://swapi-deno.azurewebsites.net/api';

  getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) throw new Error(res.status.toString());

    return await res.json();
  };

  async getAllPeople() {
    const res = await this.getResource('/people/');
    return res.slice(0, 100).map(this._transformPeople);
  }
  async getPeopleById(id: string) {
    const res = await this.getResource(`/people/${id}/`);
    return this._transformPeople(res);
  }
  async getPlanet(id: number) {
    const res = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(res);
  }
  _transformPeople = (person: IPersonResponse): IPerson => {
    const { name, gender, birth_year, eye_color, height, url, hair_color, mass, skin_color } = person;

    return {
      id: Number(url),
      name,
      gender,
      birth_year,
      eye_color,
      height,
      hair_color,
      mass,
      skin_color,
    };
  };
  _transformPlanet = (planet: IPlanetResponse): IPlanet => {
    const { name, population, rotation_period, diameter, terrain, url } = planet;

    return {
      id: Number(url),
      name,
      population,
      rotation_period,
      diameter,
      terrain,
    };
  };
}
export { SwapiService };
