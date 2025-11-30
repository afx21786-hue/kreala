import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

// todo: remove mock functionality
const testimonials = [
  {
    id: 1,
    name: "Ananya Krishnan",
    role: "Founder, TechStart Kerala",
    content: "KEF's Startup Boot Camp was transformative. The mentorship and investor connections helped us scale from an idea to a funded startup in just 6 months.",
    initials: "AK",
  },
  {
    id: 2,
    name: "Rahul Menon",
    role: "CEO, GreenAgri Solutions",
    content: "The network and resources provided by KEF have been invaluable. Their corporate connect program opened doors we never thought possible.",
    initials: "RM",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Student Entrepreneur, IIT Palakkad",
    content: "As a student, KEF's campus initiatives gave me the confidence and skills to start my entrepreneurial journey. The workshops are world-class.",
    initials: "PN",
  },
];

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-kef-teal/10 text-kef-teal text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Voices from Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
              Community
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from entrepreneurs who have transformed their ideas into successful ventures with KEF.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`border-0 shadow-sm hover-elevate transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-kef-teal to-kef-gold text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
