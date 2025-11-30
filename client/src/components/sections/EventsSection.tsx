import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SectionDecorations } from "@/components/ui/decorative-elements";
import eventImage from "@assets/generated_images/premium_business_conference_stage.png";

// todo: remove mock functionality
const events = [
  {
    id: 1,
    title: "Kerala Startup Fest - January",
    date: "January 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Technopark, Thiruvananthapuram",
    category: "Summit",
    attendees: 1000,
    image: eventImage,
    featured: true,
  },
  {
    id: 2,
    title: "KEF Founder Roundtable",
    date: "January 25, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "InfoPark, Kochi",
    category: "Networking",
    attendees: 50,
    featured: false,
  },
  {
    id: 3,
    title: "Startup Boot Camp",
    date: "February 5, 2025",
    time: "Residential Program",
    location: "Across Kerala",
    category: "Training",
    attendees: 200,
    featured: false,
  },
  {
    id: 4,
    title: "Business Conclaves",
    date: "Multiple Dates",
    time: "Varies",
    location: "Multiple Locations",
    category: "Networking",
    attendees: 500,
    featured: false,
  },
];

export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleRegister = (eventTitle: string) => {
    toast({
      title: "Registration Started!",
      description: `You're registering for ${eventTitle}. We'll send confirmation to your email soon.`,
    });
  };

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

  const featuredEvent = events.find((e) => e.featured);
  const otherEvents = events.filter((e) => !e.featured);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
      <SectionDecorations position="both" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-kef-gold/10 text-kef-gold text-sm font-medium mb-4">
              Upcoming Events
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-gold to-kef-red">
                Events
              </span>
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 self-start md:self-auto" 
            onClick={() => navigate("/events")}
            data-testid="button-view-all-events"
          >
            Explore All Events
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredEvent && (
            <Card
              className={`group overflow-visible border-0 shadow-md card-hover-lift transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              data-testid={`card-event-featured-${featuredEvent.id}`}
            >
              <div className="relative h-64 overflow-hidden rounded-t-md">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2 bg-kef-gold text-foreground">{featuredEvent.category}</Badge>
                  <h3 className="text-2xl font-bold text-white">{featuredEvent.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-kef-teal" />
                    {featuredEvent.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-kef-gold" />
                    {featuredEvent.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-kef-red" />
                    {featuredEvent.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {featuredEvent.attendees}+ Expected
                  </div>
                </div>
                <Button className="w-full" onClick={() => handleRegister(featuredEvent.title)} data-testid="button-register-featured-event">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {otherEvents.map((event, index) => (
              <Card
                key={event.id}
                className={`group card-hover-lift border-0 shadow-sm transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                data-testid={`card-event-${event.id}`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-kef-teal/10 to-kef-gold/10 flex flex-col items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-lg font-bold text-foreground leading-tight text-center">
                      {event.date.split(" ")[1]?.replace(",", "")}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">
                      {event.date.split(" ")[0]?.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold truncate group-hover:text-primary transition-colors">{event.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location.split(",")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees}+
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleRegister(event.title)} data-testid={`button-register-event-${event.id}`}>
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
