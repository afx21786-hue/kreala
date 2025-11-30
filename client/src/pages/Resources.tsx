import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, FileText, Download, BookOpen, Video, ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string;
  link: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: resourcesData, isLoading } = useQuery<{ resources: Resource[] }>({
    queryKey: ["/api/resources"],
  });

  const resources = resourcesData?.resources?.filter(r => r.isActive) || [];
  
  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const articles = filteredResources.filter(r => r.type === "article" || r.type === "blog");
  const downloads = filteredResources.filter(r => r.type === "document" || r.type === "template" || r.type === "download");
  const videos = filteredResources.filter(r => r.type === "video");

  const handleReadMore = (resource: Resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Resources Yet</h3>
                <p className="text-muted-foreground">Check back soon for articles, templates, and more!</p>
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="all" className="gap-2" data-testid="tab-all">
                    All ({filteredResources.length})
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="gap-2" data-testid="tab-articles">
                    <BookOpen className="w-4 h-4" />
                    Articles ({articles.length})
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="gap-2" data-testid="tab-downloads">
                    <Download className="w-4 h-4" />
                    Downloads ({downloads.length})
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="gap-2" data-testid="tab-videos">
                    <Video className="w-4 h-4" />
                    Videos ({videos.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => (
                      <ResourceCard 
                        key={resource.id} 
                        resource={resource} 
                        index={index}
                        onReadMore={handleReadMore}
                        formatDate={formatDate}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="articles">
                  <div className="grid md:grid-cols-2 gap-6">
                    {articles.length === 0 ? (
                      <div className="col-span-2 text-center py-12 text-muted-foreground">
                        No articles available yet.
                      </div>
                    ) : (
                      articles.map((resource, index) => (
                        <ResourceCard 
                          key={resource.id} 
                          resource={resource} 
                          index={index}
                          onReadMore={handleReadMore}
                          formatDate={formatDate}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="downloads">
                  <div className="grid md:grid-cols-2 gap-6">
                    {downloads.length === 0 ? (
                      <div className="col-span-2 text-center py-12 text-muted-foreground">
                        No downloads available yet.
                      </div>
                    ) : (
                      downloads.map((resource, index) => (
                        <Card
                          key={resource.id}
                          className="border-0 shadow-sm hover-elevate animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                          data-testid={`card-download-${resource.id}`}
                        >
                          <CardContent className="p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
                                {resource.link ? (
                                  <Button 
                                    size="sm" 
                                    className="gap-2" 
                                    onClick={() => window.open(resource.link!, '_blank')}
                                    data-testid={`button-download-${resource.id}`}
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleReadMore(resource)}
                                    data-testid={`button-view-${resource.id}`}
                                  >
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="videos">
                  <div className="grid md:grid-cols-3 gap-6">
                    {videos.length === 0 ? (
                      <div className="col-span-3 text-center py-12 text-muted-foreground">
                        No videos available yet.
                      </div>
                    ) : (
                      videos.map((video, index) => (
                        <Card
                          key={video.id}
                          className="border-0 shadow-sm hover-elevate group animate-fade-in overflow-visible"
                          style={{ animationDelay: `${index * 100}ms` }}
                          data-testid={`card-video-${video.id}`}
                        >
                          <div className="relative h-40 bg-gradient-to-br from-kef-teal/20 via-kef-gold/20 to-kef-red/20 rounded-t-md flex items-center justify-center">
                            <div 
                              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                              onClick={() => video.link ? window.open(video.link, '_blank') : handleReadMore(video)}
                            >
                              <Video className="w-8 h-8 text-primary ml-1" />
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{video.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                            {video.link && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full gap-2"
                                onClick={() => window.open(video.link!, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4" />
                                Watch Video
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedResource?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-3 pt-2">
              <Badge variant="secondary">{selectedResource?.type}</Badge>
              {selectedResource?.createdAt && (
                <span className="text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedResource.createdAt)}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed">
              {selectedResource?.description || "No description available."}
            </p>
            {selectedResource?.link && (
              <div className="mt-6">
                <Button 
                  className="gap-2"
                  onClick={() => window.open(selectedResource.link!, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Resource
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResourceCard({ 
  resource, 
  index, 
  onReadMore,
  formatDate
}: { 
  resource: Resource; 
  index: number;
  onReadMore: (resource: Resource) => void;
  formatDate: (date: string) => string;
}) {
  return (
    <Card
      className="border-0 shadow-sm hover-elevate group animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      data-testid={`card-resource-${resource.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <Badge variant="secondary">{resource.type}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(resource.createdAt)}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{resource.description}</p>
        <div className="flex items-center justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 group/btn"
            onClick={() => onReadMore(resource)}
            data-testid={`button-read-more-${resource.id}`}
          >
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
