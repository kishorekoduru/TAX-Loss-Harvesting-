
import { Code, Image, Settings, User } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Clean Code",
      description: "Built with modern best practices using React, TypeScript, and Tailwind CSS.",
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Customizable",
      description: "Easily customize components and styles to match your brand identity.",
    },
    {
      icon: <Image className="h-6 w-6 text-primary" />,
      title: "Responsive Design",
      description: "Looks great on any device, from mobile phones to large desktop screens.",
    },
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "User-Friendly",
      description: "Intuitive interfaces designed with user experience in mind.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DevAssign comes with all the features you need to build beautiful and functional web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
