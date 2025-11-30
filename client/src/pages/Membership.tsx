import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Star, Zap, Crown, ArrowRight } from "lucide-react";

// todo: remove mock functionality
const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for aspiring entrepreneurs",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Star,
    popular: false,
    features: [
      "Access to community events",
      "Newsletter & updates",
      "Basic resource library",
      "Online community access",
      "Monthly webinars",
    ],
    cta: "Join Free",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For serious entrepreneurs",
    monthlyPrice: 999,
    yearlyPrice: 9999,
    icon: Zap,
    popular: true,
    features: [
      "Everything in Starter",
      "Priority event registration",
      "Mentorship matching",
      "Exclusive workshops",
      "Investor introductions",
      "Co-working discounts",
      "Program fee discounts",
    ],
    cta: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For established startups",
    monthlyPrice: 4999,
    yearlyPrice: 49999,
    icon: Crown,
    popular: false,
    features: [
      "Everything in Professional",
      "Dedicated success manager",
      "Custom program access",
      "Speaking opportunities",
      "VIP networking events",
      "Corporate connections",
      "PR & media support",
      "Board advisory access",
    ],
    cta: "Contact Sales",
  },
];

const benefits = [
  { title: "50,000+", description: "Community Members" },
  { title: "100+", description: "Events Per Year" },
  { title: "200+", description: "Mentors Available" },
  { title: "500+", description: "Startups Supported" },
];

export default function Membership() {
  const [isYearly, setIsYearly] = useState(true);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-teal/10 text-kef-teal text-sm font-medium mb-4">
                Membership
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join Kerala's Largest{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
                  Entrepreneurial Community
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose a plan that fits your entrepreneurial journey and unlock exclusive benefits.
              </p>

              <div className="flex items-center justify-center gap-3">
                <Label htmlFor="billing-toggle" className={!isYearly ? "font-semibold" : "text-muted-foreground"}>
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  data-testid="toggle-billing"
                />
                <Label htmlFor="billing-toggle" className={isYearly ? "font-semibold" : "text-muted-foreground"}>
                  Yearly
                </Label>
                {isYearly && (
                  <Badge variant="secondary" className="ml-2 bg-kef-gold/10 text-kef-gold">
                    Save 20%
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" ref={sectionRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={plan.id}
                  data-index={index}
                  className={`relative border-0 shadow-md card-hover-lift group transition-all duration-600 ease-out ${
                    plan.popular ? "ring-2 ring-primary" : ""
                  } ${
                    visibleCards.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  data-testid={`card-plan-${plan.id}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      plan.popular ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <plan.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">
                          {isYearly ? plan.yearlyPrice : plan.monthlyPrice === 0 ? "Free" : `₹${plan.monthlyPrice}`}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-muted-foreground">
                            /{isYearly ? "year" : "month"}
                          </span>
                        )}
                      </div>
                      {plan.monthlyPrice > 0 && isYearly && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ₹{Math.round(plan.yearlyPrice / 12)}/month billed yearly
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full gap-2 ${plan.popular ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
                      variant={plan.popular ? "default" : "outline"}
                      data-testid={`button-select-${plan.id}`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join KEF?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be part of a thriving ecosystem that's transforming Kerala's entrepreneurial landscape.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="border-0 shadow-sm text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`stat-${benefit.description.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red mb-2">
                      {benefit.title}
                    </div>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
