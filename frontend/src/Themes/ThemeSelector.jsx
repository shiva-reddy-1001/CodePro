import React from 'react';
const LightTheme = React.lazy(() => import('./lightWrapper'));
const DarkTheme = React.lazy(() => import('./darkWrapper'));

const ThemeSelector = ({ children }) => {
  const CHOSEN_THEME = localStorage.getItem('Theme') || "LIGHT";
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === "LIGHT") && <LightTheme />}
        {(CHOSEN_THEME === "DARK") && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

export default ThemeSelector;