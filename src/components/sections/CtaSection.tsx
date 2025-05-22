
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary to-blue-600 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of developers who are already building amazing projects with DevAssign.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-6 text-primary hover:text-primary">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="px-6 text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
