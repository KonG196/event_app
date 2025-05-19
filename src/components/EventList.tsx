import React, { FC } from 'react';
import { IEvent } from '../types';

interface Props {
  events: IEvent[];
  onEdit: (e: IEvent) => void;
  onDelete: (id: string) => void;
  filter: string;
  search: string;
}

const EventList: FC<Props> = ({ events, onEdit, onDelete, filter, search }) => {
  const filtered = events
    .filter(e => !filter || e.importance === filter)
    .filter(e => 
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ul className="space-y-2">
      {filtered.map(e => (
        <li
          key={e.id}
          className="flex justify-between items-center p-4 border rounded"
        >
          <div>
            <h3 className="font-medium">{e.name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(e.date).toLocaleString()} — {e.importance}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(e)}
              className="text-blue-600 hover:underline text-sm"
            >
              Редагувати
            </button>
            <button
              onClick={() => onDelete(e.id!)}
              className="text-red-600 hover:underline text-sm"
            >
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
