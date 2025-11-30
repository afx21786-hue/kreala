import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionDecorations } from "@/components/ui/decorative-elements";

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <SectionDecorations position="both" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
              Kerala Economic Forum
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Kerala Economic Forum (KEF) is a non-profit organisation dedicated to building a strong entrepreneurial ecosystem across Kerala.
          </p>
          <p className="text-muted-foreground mb-4">
            We bring together entrepreneurs, students, institutions, experts, investors, and thought leaders to create opportunities, build networks, and support new ideas.
          </p>
          <p className="text-muted-foreground mb-8">
            Our mission is to help Kerala become a leading hub for startups, innovation, and economic development.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 group" 
            onClick={() => navigate("/about")}
            data-testid="button-learn-more"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
