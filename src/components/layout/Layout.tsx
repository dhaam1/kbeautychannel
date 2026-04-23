import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFAFA]">
      <Navbar isDarkBackground={false} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
