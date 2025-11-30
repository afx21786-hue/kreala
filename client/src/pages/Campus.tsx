import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap, Lightbulb, Trophy, Users, BookOpen, Rocket,
  ArrowRight, Calendar, MapPin, CheckCircle2
} from "lucide-react";
import campusImage from "@assets/generated_images/modern_college_campus_youth.png";

// todo: remove mock functionality
const initiatives = [
  {
    icon: Lightbulb,
    title: "Entrepreneurship Workshops",
    description: "Interactive sessions on business planning, marketing, and startup fundamentals.",
    stats: "50+ workshops/year",
  },
  {
    icon: Trophy,
    title: "Idea Competitions",
    description: "Campus-level and state-level competitions with prizes and incubation support.",
    stats: "1000+ participants",
  },
  {
    icon: Rocket,
    title: "Campus Incubators",
    description: "In-campus incubation support for student-led startups with mentorship.",
    stats: "25+ partner colleges",
  },
  {
    icon: Users,
    title: "Industry Mentorship",
    description: "Connect with industry professionals for guidance and career advice.",
    stats: "100+ mentors",
  },
  {
    icon: BookOpen,
    title: "E-Cell Support",
    description: "Help colleges establish and strengthen their entrepreneurship cells.",
    stats: "40+ E-Cells",
  },
  {
    icon: GraduationCap,
    title: "Internship Programs",
    description: "Placement opportunities at partner startups and companies.",
    stats: "500+ internships",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Campus Startup Weekend",
    date: "January 20-22, 2025",
    location: "IIT Palakkad",
    type: "Hackathon",
  },
  {
    id: 2,
    title: "Women Founders Workshop",
    date: "February 8, 2025",
    location: "NIT Calicut",
    type: "Workshop",
  },
  {
    id: 3,
    title: "Kerala Student Startup Awards",
    date: "March 15, 2025",
    location: "CUSAT, Kochi",
    type: "Competition",
  },
];

const partnerColleges = [
  { name: "IIT Palakkad", location: "Palakkad" },
  { name: "NIT Calicut", location: "Kozhikode" },
  { name: "CUSAT", location: "Kochi" },
  { name: "College of Engineering Trivandrum", location: "Thiruvananthapuram" },
  { name: "Government Engineering College", location: "Thrissur" },
  { name: "Model Engineering College", location: "Kochi" },
  { name: "TKM College of Engineering", location: "Kollam" },
  { name: "Rajagiri School of Engineering", location: "Kochi" },
];

const successStories = [
  {
    name: "EcoTech Solutions",
    founder: "Arjun K",
    college: "NIT Calicut",
    description: "Started as a campus project, now serving 50+ corporate clients with sustainable packaging solutions.",
  },
  {
    name: "LearnHub",
    founder: "Sneha Menon",
    college: "CUSAT",
    description: "EdTech platform helping 10,000+ students with personalized learning paths.",
  },
  {
    name: "FarmConnect",
    founder: "Vishnu Prasad",
    college: "College of Engineering Trivandrum",
    description: "Connecting farmers directly to consumers, processing 1000+ orders monthly.",
  },
];

export default function Campus() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={campusImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-gold/10 text-kef-gold text-sm font-medium mb-4">
                Campus Initiatives
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nurturing Tomorrow's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-gold to-kef-red">
                  Entrepreneurs
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Empowering students across Kerala with the skills, resources, and networks to start their entrepreneurial journey.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2" data-testid="button-register-college">
                  Register Your College
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" data-testid="button-student-join">
                  Join as Student
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive programs designed for the unique needs of student entrepreneurs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiatives.map((initiative, index) => (
                <Card
                  key={initiative.title}
                  className="border-0 shadow-sm hover-elevate group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-initiative-${initiative.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-md bg-kef-gold/10 flex items-center justify-center transition-transform group-hover:scale-110">
                        <initiative.icon className="w-6 h-6 text-kef-gold" />
                      </div>
                      <Badge variant="secondary">{initiative.stats}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-muted-foreground text-sm">{initiative.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="events" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Campus Activities</h2>
                  <p className="text-muted-foreground">Stay updated with our campus programs.</p>
                </div>
                <TabsList>
                  <TabsTrigger value="events" data-testid="tab-events">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="colleges" data-testid="tab-colleges">Partner Colleges</TabsTrigger>
                  <TabsTrigger value="success" data-testid="tab-success">Success Stories</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="events">
                <div className="grid md:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <Card
                      key={event.id}
                      className="border-0 shadow-sm hover-elevate animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-campus-event-${event.id}`}
                    >
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-kef-gold text-foreground">{event.type}</Badge>
                        <h3 className="text-lg font-semibold mb-3">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-kef-teal" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-kef-red" />
                            {event.location}
                          </div>
                        </div>
                        <Button className="w-full mt-4" data-testid={`button-register-campus-event-${event.id}`}>
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="colleges">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {partnerColleges.map((college, index) => (
                    <Card
                      key={college.name}
                      className="border-0 shadow-sm hover-elevate animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                      data-testid={`card-college-${college.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kef-teal to-kef-gold flex items-center justify-center text-white font-semibold">
                          {college.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{college.name}</h4>
                          <p className="text-xs text-muted-foreground">{college.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="success">
                <div className="grid md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <Card
                      key={story.name}
                      className="border-0 shadow-sm hover-elevate animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-success-${story.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kef-teal via-kef-gold to-kef-red flex items-center justify-center text-white font-bold text-lg mb-4">
                          {story.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{story.name}</h3>
                        <p className="text-sm text-primary mb-1">{story.founder}</p>
                        <Badge variant="secondary" className="mb-3">{story.college}</Badge>
                        <p className="text-sm text-muted-foreground">{story.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-foreground text-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-kef-gold" />
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-background/70 mb-8">
              Whether you're a student with an idea or a college looking to foster entrepreneurship, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2" data-testid="button-campus-contact">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-download-brochure"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
