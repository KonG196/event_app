import React, { FC, useState, useEffect } from 'react';
import { IEvent } from '../types';

interface Props {
  open: boolean;
  initialData?: Partial<IEvent>;
  onSave: (data: Omit<IEvent, 'id' | 'uid'>) => void;
  onClose: () => void;
}

const levels: IEvent['importance'][] = ['normal', 'important', 'critical'];

export default function EventForm({ open, initialData = {}, onSave, onClose }: Props) {
  const [name, setName] = useState(initialData.name || '');
  const [date, setDate] = useState(initialData.date?.slice(0,16) || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [importance, setImportance] = useState<IEvent['importance']>(initialData.importance || 'normal');

  useEffect(() => {
    setName(initialData.name || '');
    setDate(initialData.date ? initialData.date.slice(0,16) : '');
    setDescription(initialData.description || '');
    setImportance(initialData.importance || 'normal');
  }, [initialData, open]);

  if (!open) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center shadow-lg">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData.id ? 'Редагувати подію' : 'Додати подію'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Назва події</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Дата й час</label>
            <input
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Опис</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Важливість</label>
            <select
              value={importance}
              onChange={e => setImportance(e.target.value as any)}
              className="w-full border rounded px-3 py-2"
            >
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2">Скасувати</button>
          <button
            onClick={() => {
              onSave({ name, date: new Date(date).toISOString(), description, importance });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
