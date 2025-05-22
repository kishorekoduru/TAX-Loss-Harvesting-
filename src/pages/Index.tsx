
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CtaSection from "@/components/sections/CtaSection";
import FeatureCard from "@/components/ui/FeatureCard";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        
        {/* Tools Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Tools
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Financial Tools</h2>
              <p className="text-lg text-muted-foreground">
                Optimize your investments with our suite of financial tools designed to help you make smarter decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/tax-loss-harvesting">
                <FeatureCard
                  icon={<ArrowRight />}
                  title="Tax Loss Harvesting"
                  description="Optimize your tax liability by strategically selling investments at a loss to offset capital gains."
                  isHighlighted={true}
                />
              </Link>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  About Us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">We Build Modern Web Applications</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our mission is to help developers create beautiful, functional web applications quickly and efficiently.
                  With our modern tech stack and focus on user experience, we make it easy to bring your ideas to life.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether you're building a personal project, a portfolio website, or a complex application,
                  our templates and components will help you achieve professional results.
                </p>
              </div>
              <div className="relative">
                <div className="bg-primary/5 absolute -top-6 -bottom-6 -left-6 -right-6 rounded-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                  alt="Team working together"
                  className="relative z-10 rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
