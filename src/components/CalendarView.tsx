// src/components/CalendarView.tsx
import React, { FC, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IEvent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  events: IEvent[];
  onDateClick: (date: Date) => void;
}

const importanceColors: Record<IEvent['importance'], string> = {
  normal: 'bg-gray-400',
  important: 'bg-yellow-400',
  critical: 'bg-red-500'
};

const CalendarView: FC<Props> = ({ events, onDateClick }) => {
  const [value, setValue] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dayEvents = selectedDate
    ? events.filter(ev => new Date(ev.date).toDateString() === selectedDate.toDateString())
    : [];

  const openModal = (date: Date) => setSelectedDate(date);
  const closeModal = () => setSelectedDate(null);
  const handleAdd = () => {
    if (selectedDate) {
      closeModal();

      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      onDateClick(nextDay);
    }
  };

  return (
    <div className="relative mx-auto">
      <Calendar
        onChange={d => d instanceof Date && setValue(d)}
        value={value}
        onClickDay={openModal}
        tileClassName="relative"
        tileContent={({ date, view }) =>
          view === 'month' && (
            <div className="absolute bottom-1 right-1 flex space-x-0.5">
              {events
                .filter(ev => new Date(ev.date).toDateString() === date.toDateString())
                .slice(0, 4)
                .map(ev => (
                  <span
                    key={ev.id}
                    className={`${importanceColors[ev.importance]} w-1.5 h-1.5 rounded-full`}
                  />
                ))}
            </div>
          )
        }
      />

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 z-30 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-4 w-full max-w-sm border shadow-lg border-gray-500"
              initial={{ scale: 0.7 }}
              animate={{ scale: 0.85 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg  mb-2">
                Події на {selectedDate.toLocaleDateString()}
              </h2>
              {dayEvents.length === 0 ? (
                <p className="text-gray-500 mb-4">Немає подій</p>
              ) : (
                <ul className="mb-4 space-y-2">
                  {dayEvents.map(ev => (
                    <li key={ev.id} className="p-2 border rounded">
                      <div className="font-medium truncate">{ev.name}</div>
                      <div className="text-xs text-gray-600">
                        {new Date(ev.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-xs">
                        Важливість:{' '}
                        <span className="font-semibold">{ev.importance}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleAdd}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Додати
                </button>
                <button
                  onClick={closeModal}
                  className="px-3 py-1 border rounded text-sm"
                >
                  Закрити
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;