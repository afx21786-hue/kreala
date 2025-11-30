import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Users, Search, Filter, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string | null;
  image: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const { toast } = useToast();

  const { data: eventsData, isLoading } = useQuery<{ events: Event[] }>({
    queryKey: ["/api/events"],
  });

  const events = eventsData?.events?.filter(e => e.isActive) || [];

  const handleRegisterEvent = (eventTitle: string) => {
    toast({
      title: "Registration Confirmed!",
      description: `You've registered for ${eventTitle}. A confirmation email will be sent to your registered email address.`,
    });
  };

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory = selectedCategory === "All";
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-gold/10 text-kef-gold text-sm font-medium mb-4">
                Events
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Upcoming{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-gold to-kef-red">
                  Events
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our events to learn, network, and grow with Kerala's entrepreneurial community.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
              <div className="flex flex-1 gap-3 w-full md:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-events"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">By Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <Card
                    key={event.id}
                    className="overflow-visible border-0 shadow-sm hover-elevate group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-event-${event.id}`}
                  >
                    {event.image && (
                      <div className="relative h-48 overflow-hidden rounded-t-md">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      </div>
                    )}
                    <CardContent className={`p-5 ${!event.image ? "pt-5" : ""}`}>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-kef-teal" />
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-kef-red" />
                            {event.location}
                          </div>
                        )}
                      </div>
                      <Button className="w-full gap-2" onClick={() => handleRegisterEvent(event.title)} data-testid={`button-register-${event.id}`}>
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground">No events found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
