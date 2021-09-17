import React, { useContext, useEffect, useState } from 'react';
import Context from './context/Context';

function Table() {
  const context = useContext(Context);
  const { data, loaded } = context;
  const { results } = data;

  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: 0,
        },
      ],
    },
  });

  const [list, setList] = useState({
    list: [],
  });

  useEffect(() => {
    setList({
      list: results,
    });
  }, [loaded, results]);

  const nome = filter.filters.filterByName.name;
  const { column } = filter.filters.filterByNumericValues[0];
  const { comparison } = filter.filters.filterByNumericValues[0];
  const valueNumeric = filter.filters.filterByNumericValues[0].value;

  function criaTable(planet) {
    const { name,
      diameter,
      climate,
      gravity,
      terrain,
      population,
      films,
      created,
      edited,
      url,
    } = planet;

    const renderFilmes = () => (
      (
        <ul>
          { films.map((f) => (<li key={ f }><a href={ f }>{ f }</a></li>)) }
        </ul>
      )
    );

    return (
      <tr key={ planet.name }>
        <td>{ name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ diameter }</td>
        <td>{ climate }</td>
        <td>{ gravity }</td>
        <td>{ terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ population }</td>
        <td>{ renderFilmes() }</td>
        <td>{ created }</td>
        <td>{ edited }</td>
        <td>{ url }</td>
      </tr>
    );
  }

  function filterTabel() {
    const lowerBusca = nome.toLowerCase();
    const filterName = list.list
      .filter((planetFilter) => planetFilter.name.toLowerCase().includes(lowerBusca));
    if (comparison === 'maior que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => Number(planetFilter[column]) > Number(valueNumeric));
      console.log(planetasFiltrados);
      setList({
        list: planetasFiltrados,
      });
    }
    if (comparison === 'menor que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => Number(planetFilter[column]) < Number(valueNumeric));
      console.log(planetasFiltrados);
      setList({
        list: planetasFiltrados,
      });
    }
    if (comparison === 'igual a') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => Number(planetFilter[column]) === Number(valueNumeric));
      console.log(planetasFiltrados);
      setList({
        list: planetasFiltrados,
      });
    }
    return filterName.map((planet) => (criaTable(planet)));
  }

  function renderTable() {
    const lowerBusca = nome.toLowerCase();
    const filterName = list.list
      .filter((planetFilter) => planetFilter.name.toLowerCase().includes(lowerBusca));
    return filterName.map((planet) => (criaTable(planet)));
  }

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          value={ nome }
          onChange={ (e) => setFilter({
            filters: {
              ...filter.filters,
              filterByName: {
                name: e.target.value,
              },
            },
          }) }
        />
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setFilter({
            filters: {
              ...filter.filters,
              filterByNumericValues: [
                {
                  ...filter.filters.filterByNumericValues[0],
                  column: e.target.value,
                },
              ],
            },
          }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (e) => setFilter({
            filters: {
              ...filter.filters,
              filterByNumericValues: [
                {
                  ...filter.filters.filterByNumericValues[0],
                  comparison: e.target.value,
                },
              ],
            },
          }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ valueNumeric }
          onChange={ (e) => setFilter({
            filters: {
              ...filter.filters,
              filterByNumericValues: [
                {
                  ...filter.filters.filterByNumericValues[0],
                  value: e.target.value,
                },
              ],
            },
          }) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterTabel }
        >
          Adicionar filtro
        </button>
      </form>
      <table border="1">
        <tr>
          <th>Nome</th>
          <th>Período de Rotação</th>
          <th>Período Orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terra</th>
          <th>Agua</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado em</th>
          <th>Editado</th>
          <th>URL</th>
        </tr>
        { loaded && list.list ? renderTable() : <h3>loading...</h3> }
      </table>
    </div>
  );
}

export default Table; // gerg

/*  if (comparison === 'maior que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => planetFilter[column] > valueNumeric);
      return planetasFiltrados.map((planet) => (criaTable(planet)));
    }
    if (comparison === 'menor que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => planetFilter[column] < valueNumeric);
      return planetasFiltrados.map((planet) => (criaTable(planet)));
    }
    if (comparison === 'igual a') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => planetFilter[column] < valueNumeric);
      return planetasFiltrados.map((planet) => (criaTable(planet)));
    } */
