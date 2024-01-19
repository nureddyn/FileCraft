import './App.css';
import { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useThemeHandler } from '../../utilities/color-theme';

// Import the following components
import AuthPage from '../AuthPage/AuthPage';
import FunctionListPage from '../FunctionListPage/FunctionListPage';

import ImageConverterPage from '../ImageConverterPage/ImageConverterPage';
import ImageFilterPage from '../ImageFilterPage/ImageFilterPage';
import FileSharingPage from '../FileSharingPage/FileSharingPage';
import MyCraftsPage from '../MyCraftsPage/MyCraftsPage';

import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

export const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(getUser());
  const [theme, setTheme] = useThemeHandler();

  return (
    <main className="App">
      <ThemeContext.Provider value={[theme, setTheme]}>
        { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <h1>App</h1>
            <Routes>
              <Route path="/functions" element={<FunctionListPage />} />
              <Route path="/saved" element={<MyCraftsPage />} />


              <Route path="/functions/ImageConverter" element={<ImageConverterPage />} />
              <Route path="/functions/ImageFilters" element={<ImageFilterPage />} />
              <Route path="/functions/FileSharing" element={<FileSharingPage />} />

              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/*" element={<Navigate to="/functions" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
        }
      </ThemeContext.Provider>
    </main>
  );
}

export default App;
