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
      filterByNumericValues: [],
    },
  });

  const [preFIlter, serPreFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
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

  function criaDrop() {
    return filter.filters.filterByNumericValues
      .map((info, i) => (
        <div key={ i } id={ info.column } data-testid="filter">
          <span>
            {`Filtrar por ${info.column} ${info.comparison} ${info.value}`}
          </span>
          <button
            type="button"
            onClick={ () => {
              const array = filter.filters.filterByNumericValues;
              const arrayUpdate = array
                .filter((e) => (
                  e !== filter.filters.filterByNumericValues[i]
                ));
              setFilter({
                filters: {
                  filterByName: filter.filters.filterByName,
                  filterByNumericValues: arrayUpdate,
                },
              });
              return setList({
                list: results,
              });
            } }
          >
            X
          </button>
          <br />
        </div>
      ));
  }

  function criaTable(planet) {
    const renderFilmes = () => (
      (
        <ul>
          { planet.films.map((f) => (<li key={ f }><a href={ f }>{ f }</a></li>)) }
        </ul>
      )
    );

    return (
      <tr key={ planet.name }>
        <td>{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ planet.population }</td>
        <td>{ renderFilmes() }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    );
  }

  function filterTabel() {
    const pai = document.getElementById('column-filter');
    const child = document.getElementById(preFIlter.column);
    pai.removeChild(child);
    setFilter({
      filters: {
        ...filter.filters,
        filterByNumericValues: filter.filters.filterByNumericValues.concat(
          {
            column: preFIlter.column,
            comparison: preFIlter.comparison,
            value: preFIlter.value,
          },
        ),
      },
    });
    const lowerBusca = nome.toLowerCase();
    const filterName = list.list
      .filter((planetFilter) => planetFilter.name.toLowerCase().includes(lowerBusca));
    if (preFIlter.comparison === 'maior que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => (
          Number(planetFilter[preFIlter.column]) > Number(preFIlter.value)
        ));
      setList({
        list: planetasFiltrados,
      });
    }
    if (preFIlter.comparison === 'menor que') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => (
          Number(planetFilter[preFIlter.column]) < Number(preFIlter.value)
        ));
      setList({
        list: planetasFiltrados,
      });
    }
    if (preFIlter.comparison === 'igual a') {
      const planetasFiltrados = filterName
        .filter((planetFilter) => (
          Number(planetFilter[preFIlter.column]) === Number(preFIlter.value)
        ));
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
    <div id="input-tabel">
      <form id="input-filter-form">
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
          id="column-filter"
          data-testid="column-filter"
          value={ preFIlter.column }
          onChange={ (e) => serPreFilter({
            ...preFIlter,
            column: e.target.value,
          }) }
        >
          <option value="population" id="population">population</option>
          <option value="orbital_period" id="orbital_period">orbital_period</option>
          <option value="diameter" id="diameter">diameter</option>
          <option value="rotation_period" id="rotation_period">rotation_period</option>
          <option value="surface_water" id="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ preFIlter.comparison }
          onChange={ (e) => serPreFilter({
            ...preFIlter,
            comparison: e.target.value,
          }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ preFIlter.value }
          onChange={ (e) => serPreFilter({
            ...preFIlter,
            value: e.target.value,
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
      <div id="drop-filter">
        { filter.filters.filterByNumericValues.length > 0 ? criaDrop() : '' }
      </div>
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
