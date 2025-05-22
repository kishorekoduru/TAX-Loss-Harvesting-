
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  className,
  isHighlighted = false,
  onClick
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-border p-6 transition-all duration-300",
        isHighlighted ? "shadow-lg border-primary/20 hover:shadow-xl" : "hover:shadow-md hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
        isHighlighted ? "bg-primary/20 text-primary" : "bg-primary/10"
      )}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
