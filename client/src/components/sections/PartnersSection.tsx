import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// todo: remove mock functionality
const partners = [
  { name: "TechCorp", category: "Technology" },
  { name: "InnovateLabs", category: "Research" },
  { name: "GrowthFund", category: "Investment" },
  { name: "StartupHub", category: "Incubation" },
  { name: "EduTech", category: "Education" },
  { name: "GreenEnergy", category: "Sustainability" },
  { name: "FinServe", category: "Finance" },
  { name: "HealthPlus", category: "Healthcare" },
  { name: "AgriTech", category: "Agriculture" },
  { name: "SmartCity", category: "Urban" },
];

export default function PartnersSection() {
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
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-red to-kef-teal">
              Industry Leaders
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading organizations to create a thriving entrepreneurial ecosystem.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-8 animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-40 h-24 rounded-md bg-card border border-border flex items-center justify-center card-hover-lift group cursor-pointer"
                data-testid={`partner-logo-${partner.name.toLowerCase()}-${index}`}
              >
                <div className="text-center">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{partner.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-16 p-8 rounded-md bg-gradient-to-r from-kef-teal/10 via-kef-gold/10 to-kef-red/10 border border-border transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Become a Partner</h3>
              <p className="text-muted-foreground">
                Join our network and help shape Kerala's entrepreneurial future.
              </p>
            </div>
            <Button 
              size="lg" 
              className="gap-2 shrink-0" 
              onClick={() => navigate("/partners")}
              data-testid="button-become-partner"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
