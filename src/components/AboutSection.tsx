const AboutSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-wider">
              Welcome to Aero Car Store
            </h2>
            <div className="text-primary text-xl font-bold mb-6 uppercase tracking-widest">
              Car Club Since 1892
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground animate-fade-in-up-delay-200">
            <p className="text-lg leading-relaxed mb-6">
              For over a century, Aero Car Store has been at the forefront of automotive excellence. 
              What started as a small garage in 1892 has evolved into the premier destination for 
              high-performance car parts, accessories, and tuning solutions.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              Our passion for automotive engineering drives us to source only the finest components 
              from leading manufacturers worldwide. Whether you're building a track weapon or 
              enhancing your daily driver, we have the expertise and inventory to make your vision reality.
            </p>
          </div>

          {/* Signature */}
          <div className="animate-fade-in-up-delay-300">
            <div className="inline-block border-b-2 border-primary pb-2">
              <span className="text-2xl font-bold text-primary italic">The Aero Team</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">130+</div>
              <div className="text-muted-foreground uppercase tracking-wider">Years of Excellence</div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground uppercase tracking-wider">Happy Customers</div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground uppercase tracking-wider">Premium Parts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;