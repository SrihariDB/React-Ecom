import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import MainContent from './Component/MainContent';
import ProductTags from './Component/ProductTags';

const App = () => {
  return (
    <div className="bg-[#10172a] w-full">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route
              path="products/:id"
              element={<ProductTags />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
