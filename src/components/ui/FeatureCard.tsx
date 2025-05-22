
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
