import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const Provider = ({ children }) => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [data, setData] = useState({
    data: [],
    loaded: false,
  });

  useEffect(() => {
    async function fetchPlanets() {
      const theData = await fetch(url).then((response) => response.json());

      setData({
        data: theData,
        loaded: true,
      });
    }
    fetchPlanets();
  }, []);

  return (
    <Context.Provider value={ data }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Provider;
