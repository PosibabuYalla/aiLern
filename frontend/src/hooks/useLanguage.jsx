import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    welcome_back: 'Welcome back',
    continue_learning_journey: 'Continue your learning journey',
    day_streak: 'day streak',
    level: 'Level',
    courses_completed: 'Courses Completed',
    hours_learned: 'Hours Learned',
    total_points: 'Total Points',
    skill_level: 'Skill Level',
    recommended_for_you: 'Recommended for You',
    recent_activity: 'Recent Activity',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    first_name: 'First Name',
    last_name: 'Last Name',
    submit: 'Submit',
    loading: 'Loading...',
    dashboard: 'Dashboard',
    courses: 'Courses',
    community: 'Community',
    profile: 'Profile'
  },
  es: {
    welcome_back: 'Bienvenido de nuevo',
    continue_learning_journey: 'Continúa tu viaje de aprendizaje',
    day_streak: 'días seguidos',
    level: 'Nivel',
    courses_completed: 'Cursos Completados',
    hours_learned: 'Horas Aprendidas',
    total_points: 'Puntos Totales',
    skill_level: 'Nivel de Habilidad',
    recommended_for_you: 'Recomendado para Ti',
    recent_activity: 'Actividad Reciente',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    expert: 'Experto',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo',
    password: 'Contraseña',
    first_name: 'Nombre',
    last_name: 'Apellido',
    submit: 'Enviar',
    loading: 'Cargando...',
    dashboard: 'Panel',
    courses: 'Cursos',
    community: 'Comunidad',
    profile: 'Perfil'
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};