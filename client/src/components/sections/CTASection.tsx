import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 rounded-full bg-kef-red blur-3xl -top-48 -left-48 animate-pulse-glow" />
        <div className="absolute w-96 h-96 rounded-full bg-kef-gold blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
        <div className="absolute w-96 h-96 rounded-full bg-kef-teal blur-3xl -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Join the Movement
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
              Entrepreneurial Journey?
            </span>
          </h2>

          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join 50,000+ entrepreneurs, innovators, and changemakers who are shaping Kerala's economic future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 group" 
              onClick={() => navigate("/membership")}
              data-testid="button-cta-join"
            >
              Become a Member
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/contact")}
              data-testid="button-cta-contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
