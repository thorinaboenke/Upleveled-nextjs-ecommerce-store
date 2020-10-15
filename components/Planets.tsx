import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styles from '../styles/Home.module.css';

const planetQuery = gql`
  query {
    allPlanets {
      planets {
        name
        id
      }
    }
  }
`;

export default function Planets() {
  const { loading, error, data } = useQuery(planetQuery);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className={styles.planetcontainer}>
      {data.allPlanets.planets.map((planet) =>
        planet.name === 'unknown' || planet.name === 'Alderaan' ? null : (
          <div key={planet.id} className={styles.planet}>
            {planet.name}
          </div>
        ),
      )}
    </div>
  );
}
