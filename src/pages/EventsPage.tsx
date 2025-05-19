// src/pages/EventsPage.tsx
import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import FilterSearch from '../components/FilterSearch';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import { IEvent } from '../types';

const EventsPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [current, setCurrent] = useState<Partial<IEvent>>({});

  const handleSave = (data: Omit<IEvent, 'id' | 'uid'>) => {
    if (current.id) {
      updateEvent(current.id, data);
    } else {
      addEvent(data);
    }
    setFormOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список подій</h1>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <button
          onClick={() => { setCurrent({}); setFormOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Додати подію
        </button>
        <FilterSearch
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <EventList
        events={events}
        filter={filter}
        search={search}
        onEdit={e => { setCurrent(e); setFormOpen(true); }}
        onDelete={id => {
          if (window.confirm('Видалити подію?')) {
            deleteEvent(id);
          }
        }}
      />

      <EventForm
        open={formOpen}
        initialData={current}
        onSave={handleSave}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
};

export default EventsPage;
