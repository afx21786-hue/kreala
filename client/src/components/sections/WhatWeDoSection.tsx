import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, TrendingUp, GraduationCap, Users, Lightbulb, MapPin } from "lucide-react";

const focusAreas = [
  {
    icon: Rocket,
    title: "Startup Support & Mentoring",
    description: "Comprehensive guidance for startups from ideation to scaling",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
  },
  {
    icon: TrendingUp,
    title: "Funding & Investor Connect",
    description: "Bridge the gap between startups and investors",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
  },
  {
    icon: GraduationCap,
    title: "Campus Entrepreneurship Programs",
    description: "Nurturing student entrepreneurs across Kerala",
    color: "kef-red",
    bgColor: "bg-kef-red/10",
    textColor: "text-kef-red",
  },
  {
    icon: Users,
    title: "Business Conclaves & Networking Summits",
    description: "High-impact events connecting entrepreneurs and leaders",
    color: "kef-teal",
    bgColor: "bg-kef-teal/10",
    textColor: "text-kef-teal",
  },
  {
    icon: Lightbulb,
    title: "Advisory & Skill Development",
    description: "Expert mentorship and business advisory services",
    color: "kef-gold",
    bgColor: "bg-kef-gold/10",
    textColor: "text-kef-gold",
  },
  {
    icon: MapPin,
    title: "Local Entrepreneur Development",
    description: "Supporting local and rural businesses with growth opportunities",
    color: "kef-red",
    bgColor: "bg-kef-red/10",
    textColor: "text-kef-red",
  },
];

export default function WhatWeDoSection() {
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
    <section className="py-24 bg-muted/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-kef-teal/10 text-kef-teal text-sm font-medium mb-4">
            Our Focus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
              Do
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We empower Kerala's entrepreneurial community through comprehensive programs and initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => (
            <Card
              key={area.title}
              data-index={index}
              className={`group border-0 shadow-sm card-hover-lift transition-all duration-600 ease-out ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
              data-testid={`card-focus-${index}`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-14 h-14 rounded-md ${area.bgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <area.icon className={`w-7 h-7 ${area.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
