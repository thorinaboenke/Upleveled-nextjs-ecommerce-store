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

export default function Planets(props) {
  const { loading, error, data } = useQuery(planetQuery);
  if (loading) return 'Loading...';
  if (error) return 'Something went wrong...';
  console.log(data);

  return (
    <div className={styles.planetcontainer}>
      {data.allPlanets.planets.map((planet) =>
        planet.name === 'unknown' ? null : (
          <div key={planet.id} className={styles.planet}>
            {planet.name}
          </div>
        ),
      )}
    </div>
  );
}
