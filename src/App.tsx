/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route without Layout (to keep video background immersive) */}
        <Route path="/" element={<Home />} />
        
        {/* Pages with global layout (header etc) */}
        <Route element={<Layout />}>
          {/* Subpages have been removed as per user request */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
