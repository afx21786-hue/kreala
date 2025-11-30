import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Handshake, Users, Target, CheckCircle2 } from "lucide-react";

// todo: remove mock functionality
const partnerCategories = [
  {
    title: "Technology Partners",
    partners: [
      { name: "TechCorp India", type: "Enterprise" },
      { name: "InnovateLabs", type: "Research" },
      { name: "CloudFirst", type: "Infrastructure" },
      { name: "DataPro", type: "Analytics" },
    ],
  },
  {
    title: "Investment Partners",
    partners: [
      { name: "Kerala Ventures", type: "VC Fund" },
      { name: "StartupFund", type: "Seed Fund" },
      { name: "GrowthCapital", type: "Growth" },
      { name: "AngelNetwork", type: "Angels" },
    ],
  },
  {
    title: "Academic Partners",
    partners: [
      { name: "IIT Palakkad", type: "University" },
      { name: "NIT Calicut", type: "University" },
      { name: "CUSAT", type: "University" },
      { name: "Kerala University", type: "University" },
    ],
  },
  {
    title: "Government Partners",
    partners: [
      { name: "KSUM", type: "State Agency" },
      { name: "KSIDC", type: "Development" },
      { name: "Startup India", type: "National" },
      { name: "MSME", type: "Support" },
    ],
  },
];

const benefits = [
  {
    icon: Building2,
    title: "Brand Visibility",
    description: "Get featured across our events, website, and communications reaching 50,000+ entrepreneurs.",
  },
  {
    icon: Users,
    title: "Talent Access",
    description: "Connect with skilled entrepreneurs and emerging talent from Kerala's top institutions.",
  },
  {
    icon: Handshake,
    title: "Business Opportunities",
    description: "Access pilot projects, co-development opportunities, and early-stage innovation.",
  },
  {
    icon: Target,
    title: "Impact Investment",
    description: "Be part of Kerala's economic transformation and support sustainable entrepreneurship.",
  },
];

const partnershipTypes = [
  {
    title: "Strategic Partner",
    price: "Custom",
    features: [
      "Logo on all marketing materials",
      "Speaking slots at flagship events",
      "Custom program collaboration",
      "Dedicated success manager",
      "Board advisory access",
    ],
  },
  {
    title: "Program Partner",
    price: "₹5,00,000/year",
    features: [
      "Program co-branding",
      "Mentor network access",
      "Event sponsorship rights",
      "Startup deal flow access",
      "Quarterly impact reports",
    ],
  },
  {
    title: "Event Partner",
    price: "₹1,00,000/event",
    features: [
      "Event branding",
      "Exhibition space",
      "Attendee database",
      "Social media promotion",
      "Post-event networking",
    ],
  },
];

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-gold/10 text-kef-gold text-sm font-medium mb-4">
                Partners
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-gold to-kef-teal">
                  Ecosystem Partners
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Together with our partners, we're building Kerala's most vibrant entrepreneurial ecosystem.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {partnerCategories.map((category, categoryIndex) => (
                <Card
                  key={category.title}
                  className={`border-0 shadow-sm hover-elevate transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 100}ms` }}
                  data-testid={`card-partner-category-${category.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {category.partners.map((partner) => (
                        <div
                          key={partner.name}
                          className="p-3 rounded-md bg-muted/50 hover-elevate transition-colors"
                        >
                          <div className="font-medium text-sm">{partner.name}</div>
                          <div className="text-xs text-muted-foreground">{partner.type}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Partner With KEF?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join a network of leading organizations shaping Kerala's future.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="border-0 shadow-sm text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose a partnership level that aligns with your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((type, index) => (
                <Card
                  key={type.title}
                  className="border-0 shadow-md hover-elevate animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-partnership-${type.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardHeader className="text-center">
                    <Badge variant="secondary" className="w-fit mx-auto mb-2">
                      {type.title}
                    </Badge>
                    <CardTitle className="text-2xl">{type.price}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full gap-2" data-testid={`button-inquire-${type.title.toLowerCase().replace(/\s/g, "-")}`}>
                      Inquire Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-foreground text-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-background/70 mb-8">
              Let's discuss how we can create meaningful impact together.
            </p>
            <Button size="lg" className="gap-2" data-testid="button-partner-contact">
              Contact Our Partnership Team
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
