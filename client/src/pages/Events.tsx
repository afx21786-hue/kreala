import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Users, Search, Filter, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import eventImage from "@assets/generated_images/premium_business_conference_stage.png";

// todo: remove mock functionality
const events = [
  {
    id: 1,
    title: "Kerala Startup Summit 2025",
    date: "January 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Technopark, Thiruvananthapuram",
    category: "Summit",
    attendees: 500,
    image: eventImage,
    featured: true,
    description: "The flagship annual event bringing together entrepreneurs, investors, and industry leaders.",
  },
  {
    id: 2,
    title: "Investor Pitch Day",
    date: "January 25, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "InfoPark, Kochi",
    category: "Networking",
    attendees: 150,
    featured: false,
    description: "Present your startup to a curated panel of investors.",
  },
  {
    id: 3,
    title: "Women in Tech Workshop",
    date: "February 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Cyber Park, Kozhikode",
    category: "Workshop",
    attendees: 100,
    featured: false,
    description: "Empowering women entrepreneurs with skills and networks.",
  },
  {
    id: 4,
    title: "AI & Innovation Hackathon",
    date: "February 15-16, 2025",
    time: "48 Hours",
    location: "CUSAT, Kochi",
    category: "Hackathon",
    attendees: 300,
    featured: false,
    description: "Build innovative AI solutions in a 48-hour coding marathon.",
  },
  {
    id: 5,
    title: "Startup Legal Clinic",
    date: "February 20, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "KEF Office, Trivandrum",
    category: "Workshop",
    attendees: 50,
    featured: false,
    description: "Free legal consultations for startups on incorporation and compliance.",
  },
  {
    id: 6,
    title: "Funding Masterclass",
    date: "March 1, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Online",
    category: "Webinar",
    attendees: 200,
    featured: false,
    description: "Learn the art of fundraising from successful founders.",
  },
];

const categories = ["All", "Summit", "Networking", "Workshop", "Hackathon", "Webinar"];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "attendees") return b.attendees - a.attendees;
      return 0;
    });

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
                    <SelectItem value="attendees">By Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
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
                      <Badge className="absolute top-3 left-3 bg-kef-gold text-foreground">
                        {event.category}
                      </Badge>
                      {event.featured && (
                        <Badge className="absolute top-3 right-3 bg-kef-red text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  <CardContent className={`p-5 ${!event.image ? "pt-5" : ""}`}>
                    {!event.image && (
                      <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-kef-teal" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-kef-gold" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-kef-red" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        {event.attendees}+ Expected
                      </div>
                    </div>
                    <Button className="w-full gap-2" data-testid={`button-register-${event.id}`}>
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No events found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
