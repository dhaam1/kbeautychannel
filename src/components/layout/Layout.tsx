import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFAFA]">
      <div className="px-[5%] py-6 md:py-10">
        <Header />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
