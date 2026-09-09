import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, onOpenChat }) {
  return (
    <div className="min-h-screen bg-brand-background text-brand-text">
      <Navbar onOpenChat={onOpenChat} />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;