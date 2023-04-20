import React, { useEffect, useState} from "react";
import { SwapiService } from "../../services/api";
import Spinner from "../spinner/spinner";
import { ErrorIndicator } from "../error-indicator/error-indicator";
import {IPlanet} from "../../models";
import {PlanetView} from "../planet-view";

export const RandomPlanet:React.FC = () => {
  const swapi = new SwapiService();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [planet, setPlanet] = useState<any>(null);

  const onPlanetLoaded = (planet: IPlanet) => {
    setPlanet(planet);
    setLoading(false);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 10 + 3);
    swapi.getPlanet(id).then(onPlanetLoaded).catch(onError);
  };

  useEffect(()=> {
    updatePlanet();
    const interval = setInterval(updatePlanet, 2000)
    return () => clearInterval(interval);
  }, []);


  const hasData = !(loading || error);

  const content = hasData ? <PlanetView planet={planet} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorIndicator /> : null;
  return (
      <div>
        {errorMessage}
        {spinner}
        {content}
      </div>
  );
}
