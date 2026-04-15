import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFAFA]">
      <Header />
      <main className="flex-grow pt-[80px] md:pt-[120px]">
        <Outlet />
      </main>
    </div>
  );
}
