import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchFlight from './pages/searchFlight';

function App() {
  const BASE_URL = 'https://flight-api-j0cp.onrender.com'

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchFlight BASE_URL={BASE_URL} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
