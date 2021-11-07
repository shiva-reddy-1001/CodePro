import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import ThemeSelector from './Themes/ThemeSelector';
ReactDOM.render(
  <ThemeSelector>
    <Routes>
    </Routes>
    </ThemeSelector>,
  document.getElementById('root')
);
