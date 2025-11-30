import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, GraduationCap, Lightbulb, Stethoscope } from "lucide-react";

const programs = [
  {
    icon: Rocket,
    title: "Startup Boot Camp",
    description: "Both residential and day camps where participants learn to think like entrepreneurs with powerful workshops, business model creation, and pitching sessions.",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
    href: "/programs",
  },
  {
    icon: Users,
    title: "Business Conclaves",
    description: "Large-scale gatherings where founders, investors, mentors, thought leaders, and students connect and collaborate.",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
    href: "/events",
  },
  {
    icon: Users,
    title: "Founder Circle Meets",
    description: "Exclusive curated networking dinners and tea sessions bringing entrepreneurs and experts for honest conversations.",
    color: "kef-red",
    bgColor: "bg-kef-red/10",
    textColor: "text-kef-red",
    href: "/programs",
  },
  {
    icon: Stethoscope,
    title: "Startup Advisory Clinics",
    description: "One-on-one mentoring and business advisory sessions in finance, branding, HR, legal, marketing, and operations.",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
    href: "/startup-support",
  },
  {
    icon: GraduationCap,
    title: "Campus Innovation Labs",
    description: "Building entrepreneurship clubs, innovation cells, startup labs, and student incubators in colleges across Kerala.",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
    href: "/campus",
  },
];

export default function ProgramsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Signature{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
              Programs
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a range of programs designed to empower entrepreneurs, students, businesses, and institutions. Each program is crafted to create real impact, practical learning, and meaningful opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              data-index={index}
              className={`group border-0 shadow-sm card-hover-lift transition-all duration-600 ease-out ${
                visibleCards.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
              data-testid={`card-program-${program.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-md ${program.bgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <program.icon className={`w-6 h-6 ${program.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 p-0 h-auto group/btn"
                  onClick={() => navigate(program.href)}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2" 
            onClick={() => navigate("/programs")}
            data-testid="button-view-all-programs"
          >
            View All Programs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
