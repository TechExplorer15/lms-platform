import Navbar from "@/components/layout/Navbar";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="page-container">{children}</main>
    </div>
  );
}

export default PublicLayout;
