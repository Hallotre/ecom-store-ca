import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 pt-28 pb-16 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
