// src/animations/variants.ts
import { Variants } from 'framer-motion';

// Контейнер з каскадом для дітей
export const staggerContainer: Variants = {
  hidden: { },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Прості fade-in варіанти
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const springTransition = { type: 'spring', stiffness: 120};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springTransition }
};
export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springTransition }
};
export const slideInDown: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springTransition }
};
export const slideInUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springTransition }
};


export const scaleInCalendar: Variants = {
  hidden: { scale: 1.5, opacity: 0 },
  visible: { scale: 1.5,   opacity: 1, transition: { duration: 0.3 } }
};
