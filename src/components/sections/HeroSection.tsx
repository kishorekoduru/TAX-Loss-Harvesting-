
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-r from-blue-50 to-indigo-50 z-0"></div>
      
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-primary/5 z-0"></div>
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-100/20 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Welcome to DevAssign
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Build Beautiful Web Applications with Ease
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern web application template for developers, designers, and creators.
            Start building your next project faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-6">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-6">
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Dashboard Preview"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
