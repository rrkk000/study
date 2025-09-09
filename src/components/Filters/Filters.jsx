import React from 'react';
import './Filters.css';
import FilterSelect from './FilterSelect';

export default function Filters({ sort, setSort, material, setMaterial }) {
  const sortOptions = ['Все', 'Цена по возрастанию', 'Цена по убыванию'];
  const materialOptions = ['Все', 'Металл', 'Пластик'];

  return (
    <div className="filters-wrapper">
      <div className="filters">
        <FilterSelect
          label="Сортировать по:"
          options={sortOptions}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />

        <FilterSelect
          label="Материал:"
          options={materialOptions}
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>
    </div>
  );
}