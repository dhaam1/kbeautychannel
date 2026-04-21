import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 bg-[#FAFAFA]">
      <div className="px-[5%] py-6 md:py-10">
        <Header />
      </div>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
