import './App.css';
import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useThemeHandler } from '../../utilities/color-theme';

// Import the following components
import AuthPage from '../AuthPage/AuthPage';
import FunctionListPage from '../FunctionListPage/FunctionListPage';
import FunctionPage from '../FunctionPage/FunctionPage';
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
              <Route path="/functions/selected" element={<FunctionPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
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
