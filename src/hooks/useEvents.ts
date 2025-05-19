// src/hooks/useEvents.ts
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { IEvent } from '../types';

export function useEvents() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'events'),
      where('uid', '==', currentUser.uid)
    );

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          uid: data.uid,
          name: data.name,
          date: data.date,
          description: data.description,
          importance: data.importance
        } as IEvent;
      });
      setEvents(docs);
    }, err => {
      console.error('useEvents snapshot error:', err);
    });

    return unsub;
  }, [currentUser]);

  // Тепер Omit<IEvent, 'id'|'uid'> — у data передаємо тільки форму, а uid додаємо всередині.
  const addEvent = (data: Omit<IEvent, 'id' | 'uid'>) => {
    if (!currentUser) throw new Error('User not authenticated');
    return addDoc(collection(db, 'events'), {
      ...data,
      uid: currentUser.uid
    });
  };

  const updateEvent = (id: string, data: Partial<Omit<IEvent, 'id' | 'uid'>>) =>
    updateDoc(doc(db, 'events', id), data);

  const deleteEvent = (id: string) =>
    deleteDoc(doc(db, 'events', id));

  return { events, addEvent, updateEvent, deleteEvent };
}
