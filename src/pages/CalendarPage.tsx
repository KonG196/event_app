// src/pages/CalendarPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import { IEvent } from '../types';
import { staggerContainer, slideInLeft, scaleInCalendar } from '../animations/variants';

const CalendarPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [formOpen, setFormOpen] = useState(false);
  const [current, setCurrent] = useState<Partial<IEvent>>({});

  const handleDateClick = (date: Date) => {
    setCurrent({ date: date.toISOString() });
    setFormOpen(true);
  };

  const handleSave = (data: Omit<IEvent, 'id' | 'uid'>) => {
    if (current.id) updateEvent(current.id, data);
    else addEvent(data);
    setFormOpen(false);
  };

  return (
    
    <motion.div
      className="p-4 relative"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
 
      <motion.div
        className="flex justify-between items-center mb-4"
        variants={slideInLeft}
      >
        <h1 className="text-2xl font-bold">Календар</h1>
      </motion.div>

    <div className="flex justify-center mt-48">
      <motion.div
        className="transform "
        variants={scaleInCalendar}
      >
        <CalendarView events={events} onDateClick={handleDateClick} />
      </motion.div>
    </div>

      <AnimatePresence>
        {formOpen && (
          <EventForm
            open={formOpen}
            initialData={current}
            onSave={handleSave}
            onClose={() => setFormOpen(false)}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default CalendarPage;
