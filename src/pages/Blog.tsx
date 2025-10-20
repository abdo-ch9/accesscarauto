import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-cars-sunset.jpg";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Blog</h1>
          <p>News, tutorials, and builds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <article key={i} className="card-automotive overflow-hidden">
              <img src={heroImage} alt="Blog cover" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">Performance build #{i}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">Exploring the latest upgrades and tuning strategies for track-ready performance.</p>
                <div className="text-xs text-muted-foreground mt-3">Oct 2025 • 5 min read</div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;


