import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Rocket, Users, GraduationCap, Lightbulb, Target, Building2, ArrowRight,
  Calendar, Clock, MapPin, CheckCircle2
} from "lucide-react";

// todo: remove mock functionality
const programs = [
  {
    id: "bootcamp",
    icon: Rocket,
    title: "Startup Boot Camp",
    subtitle: "12-Week Intensive Program",
    description: "Transform your idea into a fundable startup with expert mentorship, investor connections, and hands-on workshops.",
    color: "kef-teal",
    category: "Startups",
    duration: "12 Weeks",
    nextBatch: "January 2025",
    features: [
      "One-on-one mentorship from industry experts",
      "Access to investor network",
      "Co-working space access",
      "Legal and financial advisory",
      "Demo day with top VCs",
    ],
  },
  {
    id: "investor",
    icon: Users,
    title: "Investor Connect",
    subtitle: "Funding & Networking",
    description: "Bridge the gap between promising startups and investors through curated events and networking sessions.",
    color: "kef-gold",
    category: "Funding",
    duration: "Ongoing",
    nextBatch: "Monthly Events",
    features: [
      "Curated investor pitch events",
      "One-on-one investor meetings",
      "Pitch deck reviews",
      "Funding readiness assessment",
      "Post-funding support",
    ],
  },
  {
    id: "campus",
    icon: GraduationCap,
    title: "Campus Initiatives",
    subtitle: "Student Entrepreneurship",
    description: "Empowering students with entrepreneurship skills through workshops, competitions, and incubation support.",
    color: "kef-red",
    category: "Education",
    duration: "Academic Year",
    nextBatch: "Semester-wise",
    features: [
      "Entrepreneurship workshops",
      "Idea competitions",
      "Campus incubation support",
      "Industry mentorship",
      "Internship opportunities",
    ],
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation Labs",
    subtitle: "Prototype & Build",
    description: "Access to state-of-the-art facilities, tools, and resources to prototype and test your ideas.",
    color: "kef-teal",
    category: "Resources",
    duration: "Flexible",
    nextBatch: "Open Access",
    features: [
      "3D printing and prototyping",
      "Electronics lab access",
      "Design software licenses",
      "Technical workshops",
      "Expert consultations",
    ],
  },
  {
    id: "market",
    icon: Target,
    title: "Market Access",
    subtitle: "Go-to-Market Support",
    description: "Connect with potential customers, partners, and distribution channels across Kerala and beyond.",
    color: "kef-gold",
    category: "Growth",
    duration: "6 Months",
    nextBatch: "Rolling Admissions",
    features: [
      "Market research support",
      "Customer discovery sessions",
      "B2B matchmaking",
      "Trade fair participation",
      "Export facilitation",
    ],
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Connect",
    subtitle: "Enterprise Partnerships",
    description: "Partnership opportunities with established businesses for pilot projects and scaling solutions.",
    color: "kef-red",
    category: "Partnerships",
    duration: "Project-based",
    nextBatch: "Quarterly Calls",
    features: [
      "Corporate pilot programs",
      "Technology partnerships",
      "Procurement opportunities",
      "Co-development projects",
      "Scale-up funding",
    ],
  },
];

const categories = ["All", "Startups", "Funding", "Education", "Resources", "Growth", "Partnerships"];

export default function Programs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = selectedCategory === "All"
    ? programs
    : programs.filter(p => p.category === selectedCategory);

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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = gridRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredPrograms]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Programs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Support for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
                  Every Stage
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From ideation to scale, our programs provide the resources, mentorship, and connections you need to succeed.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      data-testid={`filter-${category.toLowerCase()}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <TabsList>
                  <TabsTrigger value="grid" data-testid="view-grid">Grid</TabsTrigger>
                  <TabsTrigger value="detail" data-testid="view-detail">Detail</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid">
                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program, index) => (
                    <Card
                      key={program.id}
                      data-index={index}
                      className={`border-0 shadow-sm card-hover-lift group transition-all duration-600 ease-out ${
                        visibleCards.includes(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                      data-testid={`card-program-${program.id}`}
                    >
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-md bg-${program.color}/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <program.icon className={`w-6 h-6 text-${program.color}`} />
                        </div>
                        <Badge variant="secondary" className="mb-2">{program.category}</Badge>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{program.title}</h3>
                        <p className="text-sm text-primary mb-3">{program.subtitle}</p>
                        <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {program.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {program.nextBatch}
                          </span>
                        </div>
                        <Button className="w-full gap-2 group/btn" data-testid={`button-apply-${program.id}`}>
                          Apply Now
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="detail">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    {filteredPrograms.map((program) => (
                      <Card
                        key={program.id}
                        className={`cursor-pointer transition-all card-hover-lift group ${
                          selectedProgram.id === program.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedProgram(program)}
                        data-testid={`select-program-${program.id}`}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-md bg-${program.color}/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                            <program.icon className={`w-5 h-5 text-${program.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors">{program.title}</h4>
                            <p className="text-xs text-muted-foreground">{program.category}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="border-0 shadow-md" data-testid="program-detail-view">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <Badge variant="secondary" className="mb-2">{selectedProgram.category}</Badge>
                            <CardTitle className="text-2xl">{selectedProgram.title}</CardTitle>
                            <p className="text-primary mt-1">{selectedProgram.subtitle}</p>
                          </div>
                          <Button className="gap-2" data-testid="button-apply-detail">
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6">{selectedProgram.description}</p>
                        
                        <div className="flex flex-wrap gap-6 mb-8 p-4 bg-muted/50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p className="font-medium">{selectedProgram.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-kef-gold" />
                            <div>
                              <p className="text-xs text-muted-foreground">Next Batch</p>
                              <p className="font-medium">{selectedProgram.nextBatch}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-kef-red" />
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="font-medium">Kerala, India</p>
                            </div>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-4">What's Included</h4>
                        <ul className="space-y-3">
                          {selectedProgram.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
