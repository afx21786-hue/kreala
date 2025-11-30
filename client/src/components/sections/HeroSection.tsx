import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImage from "@assets/generated_images/kerala_modern_cityscape_hero.png";
import introVideo from "@assets/Create_a_cinematic_202511301644_hd88l_1764501532239.mp4";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Kerala Modern Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
      </div>

      <div className="absolute top-20 right-10 md:right-20 opacity-30">
        <div className="relative w-64 h-64 md:w-96 md:h-96 animate-float">
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-kef-red/40 blur-xl top-0 left-0 animate-pulse-glow" />
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-kef-gold/40 blur-xl top-0 right-0 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-kef-teal/40 blur-xl bottom-0 left-1/2 -translate-x-1/2 animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-kef-teal animate-pulse" />
              Kerala's Premier Economic Community
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Where Kerala's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
              Entrepreneurs
            </span>{" "}
            Rise Together
          </h1>

          <p
            className={`text-lg md:text-xl text-white/80 mb-8 max-w-2xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            A statewide non-profit movement empowering entrepreneurs, startups, students, institutions, and innovators to build, grow, and transform Kerala's economic future.
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button 
              size="lg" 
              className="gap-2 group" 
              onClick={() => navigate("/membership")}
              data-testid="button-hero-join"
            >
              Join the Forum
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/programs")}
              data-testid="button-hero-programs"
            >
              Explore Our Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/partners")}
              data-testid="button-hero-partner"
            >
              Partner With Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => setVideoOpen(true)}
              data-testid="button-hero-watch-video"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </Button>
          </div>

          <p
            className={`text-white/60 text-sm mt-6 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Where ideas grow. Where founders rise. Where Kerala transforms.
          </p>

          <div
            className={`grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <StatCounter value={2000} suffix="+" label="Startups to Support" />
            <StatCounter value={10000} suffix="+" label="Entrepreneurs" />
            <StatCounter value={100} suffix="+" label="Crore Funding Target" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Kerala Economic Forum</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <video
              src={introVideo}
              controls
              autoPlay
              className="w-full h-full object-cover"
              data-testid="video-intro"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}
