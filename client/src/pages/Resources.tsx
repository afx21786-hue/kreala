import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download, BookOpen, Video, ArrowRight, Calendar, Clock } from "lucide-react";

// todo: remove mock functionality
const blogPosts = [
  {
    id: 1,
    title: "10 Mistakes First-Time Founders Make",
    excerpt: "Learn from common pitfalls and build a stronger foundation for your startup journey.",
    category: "Entrepreneurship",
    readTime: "5 min read",
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "Fundraising in 2025: What VCs Are Looking For",
    excerpt: "Insights from top investors on what makes a startup investment-worthy in the current market.",
    category: "Funding",
    readTime: "8 min read",
    date: "Dec 10, 2024",
  },
  {
    id: 3,
    title: "Building a Remote-First Startup Culture",
    excerpt: "Best practices for creating a strong company culture in a distributed team environment.",
    category: "Culture",
    readTime: "6 min read",
    date: "Dec 5, 2024",
  },
  {
    id: 4,
    title: "Kerala's Rising Tech Ecosystem",
    excerpt: "How Kerala is becoming a hotbed for innovation and technology startups.",
    category: "Ecosystem",
    readTime: "7 min read",
    date: "Nov 28, 2024",
  },
];

const downloads = [
  {
    id: 1,
    title: "Startup Legal Checklist",
    description: "Essential legal steps for incorporating your startup in India.",
    type: "PDF",
    size: "245 KB",
  },
  {
    id: 2,
    title: "Pitch Deck Template",
    description: "A proven template used by successful KEF startups.",
    type: "PPTX",
    size: "1.2 MB",
  },
  {
    id: 3,
    title: "Financial Model Template",
    description: "Comprehensive financial planning spreadsheet for startups.",
    type: "XLSX",
    size: "890 KB",
  },
  {
    id: 4,
    title: "Investor Outreach Guide",
    description: "How to approach and communicate with potential investors.",
    type: "PDF",
    size: "420 KB",
  },
];

const videos = [
  {
    id: 1,
    title: "Startup Funding Masterclass",
    description: "Complete guide to raising your first round of funding.",
    duration: "45 min",
    views: "2.3K",
  },
  {
    id: 2,
    title: "Product-Market Fit Workshop",
    description: "How to validate your product idea and find your target market.",
    duration: "32 min",
    views: "1.8K",
  },
  {
    id: 3,
    title: "Scaling Your Startup",
    description: "Strategies for growing from 10 to 100 employees.",
    duration: "38 min",
    views: "1.5K",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
                Resources
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Knowledge Hub for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-red to-kef-teal">
                  Entrepreneurs
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Access articles, templates, guides, and videos to accelerate your entrepreneurial journey.
              </p>

              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-search-resources"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="articles" className="gap-2" data-testid="tab-articles">
                  <BookOpen className="w-4 h-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="downloads" className="gap-2" data-testid="tab-downloads">
                  <Download className="w-4 h-4" />
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2" data-testid="tab-videos">
                  <Video className="w-4 h-4" />
                  Videos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="articles">
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="border-0 shadow-sm hover-elevate group animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-article-${post.id}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <Button variant="ghost" size="sm" className="gap-1 group/btn">
                            Read More
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="downloads">
                <div className="grid md:grid-cols-2 gap-6">
                  {downloads.map((item, index) => (
                    <Card
                      key={item.id}
                      className="border-0 shadow-sm hover-elevate animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-download-${item.id}`}
                    >
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {item.type} • {item.size}
                            </span>
                            <Button size="sm" className="gap-2" data-testid={`button-download-${item.id}`}>
                              <Download className="w-4 h-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-8 border-0 shadow-md bg-gradient-to-r from-kef-teal/5 via-kef-gold/5 to-kef-red/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-kef-teal to-kef-gold flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      Annual Report 2024
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our comprehensive annual report highlighting KEF's impact, achievements, and the growing entrepreneurial ecosystem in Kerala.
                    </p>
                    <Button className="gap-2" data-testid="button-download-annual-report">
                      <Download className="w-4 h-4" />
                      Download Annual Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos">
                <div className="grid md:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <Card
                      key={video.id}
                      className="border-0 shadow-sm hover-elevate group animate-fade-in overflow-visible"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-video-${video.id}`}
                    >
                      <div className="relative h-40 bg-gradient-to-br from-kef-teal/20 via-kef-gold/20 to-kef-red/20 rounded-t-md flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Video className="w-8 h-8 text-primary ml-1" />
                        </div>
                        <Badge className="absolute top-3 right-3 bg-foreground/80 text-background">
                          {video.duration}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                        <span className="text-xs text-muted-foreground">{video.views} views</span>
                      </CardContent>
                    </Card>
                  ))}
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
