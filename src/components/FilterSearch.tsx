import React, { FC } from 'react';

interface Props {
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

const FilterSearch: FC<Props> = ({ filter, setFilter, search, setSearch }) => (
  <div className="flex space-x-4 mb-4">
    <select
      value={filter}
      onChange={e => setFilter(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Всі</option>
      <option value="normal">Звичайна</option>
      <option value="important">Важлива</option>
      <option value="critical">Критична</option>
    </select>
    <input
      type="text"
      placeholder="Пошук…"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="flex-1 border rounded px-3 py-2"
    />
  </div>
);

export default FilterSearch;
