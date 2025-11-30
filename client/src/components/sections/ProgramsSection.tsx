import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, GraduationCap, Lightbulb, Target, Building2 } from "lucide-react";

const programs = [
  {
    icon: Rocket,
    title: "Startup Boot Camp",
    description: "Intensive 12-week program for early-stage startups with mentorship, funding connections, and market access.",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
  },
  {
    icon: Users,
    title: "Investor Connect",
    description: "Bridge the gap between promising startups and investors through curated pitch events and networking sessions.",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
  },
  {
    icon: GraduationCap,
    title: "Campus Initiatives",
    description: "Empowering students with entrepreneurship skills through workshops, competitions, and incubation support.",
    color: "kef-red",
    bgColor: "bg-kef-red/10",
    textColor: "text-kef-red",
  },
  {
    icon: Lightbulb,
    title: "Innovation Labs",
    description: "Access to state-of-the-art facilities, tools, and resources to prototype and test your ideas.",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
  },
  {
    icon: Target,
    title: "Market Access",
    description: "Connect with potential customers, partners, and distribution channels across Kerala and beyond.",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
  },
  {
    icon: Building2,
    title: "Corporate Connect",
    description: "Partnership opportunities with established businesses for pilot projects and scaling solutions.",
    color: "kef-red",
    bgColor: "bg-kef-red/10",
    textColor: "text-kef-red",
  },
];

export default function ProgramsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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
            Signature Programs for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
              Growth
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive programs designed to support entrepreneurs at every stage of their journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              data-index={index}
              className={`group hover-elevate border-0 shadow-sm transition-all duration-500 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`card-program-${program.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-md ${program.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  <program.icon className={`w-6 h-6 ${program.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-programs">
            View All Programs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
