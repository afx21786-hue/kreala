import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import aboutImage from "@assets/generated_images/startup_workspace_team_collaboration.png";

// todo: remove mock functionality
const leadership = [
  { name: "Dr. Arun Kumar", role: "Chairman", initials: "AK" },
  { name: "Meera Nair", role: "Executive Director", initials: "MN" },
  { name: "Rajesh Pillai", role: "Head of Programs", initials: "RP" },
  { name: "Priya Menon", role: "Head of Partnerships", initials: "PM" },
];

const values = [
  { icon: Lightbulb, title: "Innovation", description: "Fostering creative solutions and breakthrough ideas" },
  { icon: Users, title: "Community", description: "Building strong networks and collaborative ecosystems" },
  { icon: Heart, title: "Empowerment", description: "Enabling individuals to achieve their full potential" },
  { icon: Award, title: "Excellence", description: "Maintaining highest standards in all our initiatives" },
];

export default function About() {
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
        <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  About KEF
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Shaping Kerala's{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
                    Economic Future
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Kerala Economic Forum is a statewide non-profit organization dedicated to empowering entrepreneurs, students, startups, and institutions across Kerala.
                </p>
                <p className="text-muted-foreground mb-8">
                  Founded with a vision to transform Kerala into a global hub for innovation and entrepreneurship, we provide comprehensive support through programs, resources, and a vibrant community network.
                </p>
                <Button size="lg" className="gap-2" data-testid="button-about-join">
                  Join Our Mission
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative animate-slide-in-right">
                <img
                  src={aboutImage}
                  alt="KEF Community"
                  className="rounded-md shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-kef-teal to-kef-gold rounded-md opacity-20 blur-xl" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-kef-gold to-kef-red rounded-md opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card
                className={`border-0 shadow-md hover-elevate transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-testid="card-mission"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-kef-teal/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-kef-teal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create a thriving entrepreneurial ecosystem in Kerala by providing world-class support, resources, and connections to innovators at every stage of their journey.
                  </p>
                </CardContent>
              </Card>
              <Card
                className={`border-0 shadow-md hover-elevate transition-all duration-500 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-testid="card-vision"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-kef-gold/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-kef-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To position Kerala as a global leader in innovation and sustainable entrepreneurship, driving economic growth while preserving our cultural values.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at KEF.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className={`border-0 shadow-sm hover-elevate text-center transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  data-testid={`card-value-${value.title.toLowerCase()}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
                Leadership
              </span>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experienced leaders driving KEF's mission forward.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((member, index) => (
                <Card
                  key={member.name}
                  className="border-0 shadow-sm hover-elevate text-center group"
                  data-testid={`card-leader-${member.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4 transition-transform group-hover:scale-105">
                      <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-kef-teal via-kef-gold to-kef-red text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
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
