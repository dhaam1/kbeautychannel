/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Main Pages
import ProceduresIndex from './pages/procedures/index';
import Column from './pages/column';

// Procedure Sub-pages
import Lifting from './pages/procedures/lifting';
import SkinBooster from './pages/procedures/skin-booster';
import Petit from './pages/procedures/petit';
import Laser from './pages/procedures/laser';
import Body from './pages/procedures/body';
import Care from './pages/procedures/care';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route without Layout (to keep video background immersive) */}
        <Route path="/" element={<Home />} />
        
        {/* Pages with global layout (header etc) */}
        <Route element={<Layout />}>
          <Route path="/procedures" element={<ProceduresIndex />} />
          <Route path="/procedures/lifting" element={<Lifting />} />
          <Route path="/procedures/skin-booster" element={<SkinBooster />} />
          <Route path="/procedures/petit" element={<Petit />} />
          <Route path="/procedures/laser" element={<Laser />} />
          <Route path="/procedures/body" element={<Body />} />
          <Route path="/procedures/care" element={<Care />} />
          
          <Route path="/media" element={<Media />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/column" element={<Column />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
