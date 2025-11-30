import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Users, Shield, TrendingUp, ArrowLeft, UserMinus, Plus, Trash2, 
  Calendar, BookOpen, FileText, Mail, Eye, MailOpen, Ticket, ClipboardList, Check, X
} from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string | null;
  signupOrder: number;
  isAdmin: boolean;
  createdAt: string;
}

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
}

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

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string;
  link: string | null;
  isActive: boolean;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Membership {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  membershipType: string;
  status: string;
  notes: string | null;
  userId: string | null;
  createdAt: string;
}

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  requestType: string;
  programId: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  adminCount: number;
  programCount: number;
  eventCount: number;
  resourceCount: number;
  messageCount: number;
  unreadMessageCount: number;
  membershipCount: number;
  recentSignups: AdminUser[];
}

export default function Admin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [programForm, setProgramForm] = useState({ title: "", description: "", category: "startup", image: "" });
  const [eventForm, setEventForm] = useState({ title: "", description: "", date: "", location: "", image: "" });
  const [resourceForm, setResourceForm] = useState({ title: "", description: "", type: "document", link: "" });
  const [membershipForm, setMembershipForm] = useState({ name: "", email: "", phone: "", organization: "", membershipType: "individual", notes: "" });
  
  const [programDialogOpen, setProgramDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);

  const { data: authData, isLoading: authLoading, error: authError } = useQuery<{ user: AdminUser }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  useEffect(() => {
    if (authError) {
      toast({
        title: "Not Logged In",
        description: "Please login to access the admin panel.",
        variant: "destructive",
      });
      localStorage.removeItem('kef_user');
      navigate("/login");
    }
  }, [authError, navigate, toast]);

  useEffect(() => {
    if (authData?.user && !authData.user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [authData, navigate, toast]);

  const currentUser = authData?.user || null;
  const isConfirmedAdmin = !authLoading && !authError && currentUser?.isAdmin === true;

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    enabled: isConfirmedAdmin,
  });

  const { data: usersData, isLoading: usersLoading } = useQuery<{ users: AdminUser[] }>({
    queryKey: ["/api/admin/users"],
    enabled: isConfirmedAdmin,
  });

  const { data: programsData, isLoading: programsLoading } = useQuery<{ programs: Program[] }>({
    queryKey: ["/api/programs"],
    enabled: isConfirmedAdmin,
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery<{ events: Event[] }>({
    queryKey: ["/api/events"],
    enabled: isConfirmedAdmin,
  });

  const { data: resourcesData, isLoading: resourcesLoading } = useQuery<{ resources: Resource[] }>({
    queryKey: ["/api/resources"],
    enabled: isConfirmedAdmin,
  });

  const { data: messagesData, isLoading: messagesLoading } = useQuery<{ messages: ContactMessage[] }>({
    queryKey: ["/api/admin/messages"],
    enabled: isConfirmedAdmin,
  });

  const { data: membershipsData, isLoading: membershipsLoading } = useQuery<{ memberships: Membership[] }>({
    queryKey: ["/api/admin/memberships"],
    enabled: isConfirmedAdmin,
  });

  const { data: requestsData, isLoading: requestsLoading } = useQuery<{ requests: Request[] }>({
    queryKey: ["/api/admin/requests"],
    enabled: isConfirmedAdmin,
  });

  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest("PATCH", `/api/admin/users/${userId}/remove-admin`);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Admin Removed", description: "Admin privileges have been removed successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to remove admin privileges", variant: "destructive" });
    },
  });

  const createProgramMutation = useMutation({
    mutationFn: async (data: typeof programForm) => {
      const response = await apiRequest("POST", "/api/admin/programs", {
        ...data,
        isActive: true,
        image: data.image || null
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Program Created", description: "Program has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setProgramDialogOpen(false);
      setProgramForm({ title: "", description: "", category: "startup", image: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to create program", variant: "destructive" });
    },
  });

  const deleteProgramMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/programs/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Program Deleted", description: "Program has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete program", variant: "destructive" });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: typeof eventForm) => {
      if (!data.date) {
        throw new Error("Event date is required");
      }
      // Convert datetime-local string to ISO timestamp
      const dateStr = data.date.includes('T') ? data.date : `${data.date}T00:00`;
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }
      
      const response = await apiRequest("POST", "/api/admin/events", {
        title: data.title,
        description: data.description,
        date: dateObj.toISOString(),
        isActive: true,
        location: data.location || null,
        image: data.image || null
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Event Created", description: "Event has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setEventDialogOpen(false);
      setEventForm({ title: "", description: "", date: "", location: "", image: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to create event", variant: "destructive" });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/events/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Event Deleted", description: "Event has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete event", variant: "destructive" });
    },
  });

  const createResourceMutation = useMutation({
    mutationFn: async (data: typeof resourceForm) => {
      const response = await apiRequest("POST", "/api/admin/resources", {
        ...data,
        isActive: true,
        description: data.description || null,
        link: data.link || null
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Resource Created", description: "Resource has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setResourceDialogOpen(false);
      setResourceForm({ title: "", description: "", type: "document", link: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to create resource", variant: "destructive" });
    },
  });

  const deleteResourceMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/resources/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Resource Deleted", description: "Resource has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete resource", variant: "destructive" });
    },
  });

  const createMembershipMutation = useMutation({
    mutationFn: async (data: typeof membershipForm) => {
      const response = await apiRequest("POST", "/api/admin/memberships", {
        ...data,
        status: "active",
        phone: data.phone || null,
        organization: data.organization || null,
        notes: data.notes || null
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Membership Created", description: "Membership token has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/memberships"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setMembershipDialogOpen(false);
      setMembershipForm({ name: "", email: "", phone: "", organization: "", membershipType: "individual", notes: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to create membership", variant: "destructive" });
    },
  });

  const deleteMembershipMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/memberships/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Membership Deleted", description: "Membership has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/memberships"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete membership", variant: "destructive" });
    },
  });

  const markMessageReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("PATCH", `/api/admin/messages/${id}/read`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/messages/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Message Deleted", description: "Message has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete message", variant: "destructive" });
    },
  });

  const updateRequestStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/admin/requests/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Request Updated", description: "Request status has been updated." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/requests"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to update request", variant: "destructive" });
    },
  });

  const deleteRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/requests/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Request Deleted", description: "Request has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/requests"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to delete request", variant: "destructive" });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>Only the first 4 users to sign up have admin access.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/dashboard")} data-testid="button-back-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-admin-title">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">Manage your platform content and users</p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Shield className="w-3 h-3" />
              Admin #{currentUser?.signupOrder}
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
              <TabsTrigger value="programs" data-testid="tab-programs">Programs</TabsTrigger>
              <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
              <TabsTrigger value="resources" data-testid="tab-resources">Resources</TabsTrigger>
              <TabsTrigger value="requests" data-testid="tab-requests">
                Requests
                {requestsData?.requests?.filter(r => r.status === 'pending').length ? (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">{requestsData.requests.filter(r => r.status === 'pending').length}</Badge>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">
                Messages
                {stats?.unreadMessageCount ? (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">{stats.unreadMessageCount}</Badge>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="memberships" data-testid="tab-memberships">Memberships</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.totalUsers || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Programs</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.programCount || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.eventCount || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.messageCount || 0}</div>
                    {stats?.unreadMessageCount ? (
                      <p className="text-xs text-muted-foreground">{stats.unreadMessageCount} unread</p>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage all registered users on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  {usersLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading users...</div>
                  ) : !usersData?.users?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No users registered yet</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">#</th>
                            <th className="text-left py-3 px-4 font-medium">Username</th>
                            <th className="text-left py-3 px-4 font-medium">Email</th>
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Role</th>
                            <th className="text-left py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersData.users.map((user) => (
                            <tr key={user.id} className="border-b" data-testid={`row-user-${user.id}`}>
                              <td className="py-3 px-4">{user.signupOrder}</td>
                              <td className="py-3 px-4 font-medium">{user.username}</td>
                              <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                              <td className="py-3 px-4">{user.name || "-"}</td>
                              <td className="py-3 px-4">
                                {user.isAdmin ? (
                                  <Badge variant="default"><Shield className="w-3 h-3 mr-1" />Admin</Badge>
                                ) : (
                                  <Badge variant="secondary">Member</Badge>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {user.isAdmin && user.id !== currentUser?.id && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      if (confirm(`Remove admin privileges from ${user.username}?`)) {
                                        removeAdminMutation.mutate(user.id);
                                      }
                                    }}
                                    disabled={removeAdminMutation.isPending}
                                  >
                                    <UserMinus className="w-4 h-4 mr-1" />
                                    Remove Admin
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle>Programs</CardTitle>
                    <CardDescription>Manage your programs and initiatives</CardDescription>
                  </div>
                  <Dialog open={programDialogOpen} onOpenChange={setProgramDialogOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-program"><Plus className="w-4 h-4 mr-2" />Add Program</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Program</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="program-title">Title</Label>
                          <Input id="program-title" value={programForm.title} onChange={(e) => setProgramForm({...programForm, title: e.target.value})} data-testid="input-program-title" />
                        </div>
                        <div>
                          <Label htmlFor="program-description">Description</Label>
                          <Textarea id="program-description" value={programForm.description} onChange={(e) => setProgramForm({...programForm, description: e.target.value})} data-testid="input-program-description" />
                        </div>
                        <div>
                          <Label htmlFor="program-category">Category</Label>
                          <Select value={programForm.category} onValueChange={(value) => setProgramForm({...programForm, category: value})}>
                            <SelectTrigger data-testid="select-program-category"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="startup">Startup Support</SelectItem>
                              <SelectItem value="campus">Campus Initiatives</SelectItem>
                              <SelectItem value="mentorship">Mentorship</SelectItem>
                              <SelectItem value="funding">Funding</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="program-image">Image URL (optional)</Label>
                          <Input id="program-image" value={programForm.image} onChange={(e) => setProgramForm({...programForm, image: e.target.value})} data-testid="input-program-image" />
                        </div>
                        <Button onClick={() => createProgramMutation.mutate(programForm)} disabled={createProgramMutation.isPending || !programForm.title || !programForm.description} className="w-full" data-testid="button-submit-program">
                          {createProgramMutation.isPending ? "Creating..." : "Create Program"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {programsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading programs...</div>
                  ) : !programsData?.programs?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No programs yet. Add your first program!</div>
                  ) : (
                    <div className="space-y-4">
                      {programsData.programs.map((program) => (
                        <div key={program.id} className="flex items-center justify-between gap-4 p-4 border rounded-md" data-testid={`program-${program.id}`}>
                          <div className="flex-1">
                            <h3 className="font-semibold">{program.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{program.description}</p>
                            <Badge variant="outline" className="mt-2">{program.category}</Badge>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => {
                            if (confirm(`Delete program "${program.title}"?`)) {
                              deleteProgramMutation.mutate(program.id);
                            }
                          }} data-testid={`button-delete-program-${program.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>Manage upcoming events and workshops</CardDescription>
                  </div>
                  <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-event"><Plus className="w-4 h-4 mr-2" />Add Event</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="event-title">Title</Label>
                          <Input id="event-title" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} data-testid="input-event-title" />
                        </div>
                        <div>
                          <Label htmlFor="event-description">Description</Label>
                          <Textarea id="event-description" value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} data-testid="input-event-description" />
                        </div>
                        <div>
                          <Label htmlFor="event-date">Date & Time</Label>
                          <Input id="event-date" type="datetime-local" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} data-testid="input-event-date" />
                        </div>
                        <div>
                          <Label htmlFor="event-location">Location (optional)</Label>
                          <Input id="event-location" value={eventForm.location} onChange={(e) => setEventForm({...eventForm, location: e.target.value})} data-testid="input-event-location" />
                        </div>
                        <div>
                          <Label htmlFor="event-image">Image URL (optional)</Label>
                          <Input id="event-image" value={eventForm.image} onChange={(e) => setEventForm({...eventForm, image: e.target.value})} data-testid="input-event-image" />
                        </div>
                        <Button onClick={() => createEventMutation.mutate(eventForm)} disabled={createEventMutation.isPending || !eventForm.title || !eventForm.description || !eventForm.date} className="w-full" data-testid="button-submit-event">
                          {createEventMutation.isPending ? "Creating..." : "Create Event"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {eventsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading events...</div>
                  ) : !eventsData?.events?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No events yet. Add your first event!</div>
                  ) : (
                    <div className="space-y-4">
                      {eventsData.events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between gap-4 p-4 border rounded-md" data-testid={`event-${event.id}`}>
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />{new Date(event.date).toLocaleDateString()}</Badge>
                              {event.location && <Badge variant="secondary">{event.location}</Badge>}
                            </div>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => {
                            if (confirm(`Delete event "${event.title}"?`)) {
                              deleteEventMutation.mutate(event.id);
                            }
                          }} data-testid={`button-delete-event-${event.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Manage resources and documents</CardDescription>
                  </div>
                  <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-resource"><Plus className="w-4 h-4 mr-2" />Add Resource</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Resource</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="resource-title">Title</Label>
                          <Input id="resource-title" value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} data-testid="input-resource-title" />
                        </div>
                        <div>
                          <Label htmlFor="resource-description">Description (optional)</Label>
                          <Textarea id="resource-description" value={resourceForm.description} onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})} data-testid="input-resource-description" />
                        </div>
                        <div>
                          <Label htmlFor="resource-type">Type</Label>
                          <Select value={resourceForm.type} onValueChange={(value) => setResourceForm({...resourceForm, type: value})}>
                            <SelectTrigger data-testid="select-resource-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="document">Document</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="link">Link</SelectItem>
                              <SelectItem value="guide">Guide</SelectItem>
                              <SelectItem value="template">Template</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="resource-link">Link (optional)</Label>
                          <Input id="resource-link" value={resourceForm.link} onChange={(e) => setResourceForm({...resourceForm, link: e.target.value})} data-testid="input-resource-link" />
                        </div>
                        <Button onClick={() => createResourceMutation.mutate(resourceForm)} disabled={createResourceMutation.isPending || !resourceForm.title} className="w-full" data-testid="button-submit-resource">
                          {createResourceMutation.isPending ? "Creating..." : "Create Resource"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {resourcesLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading resources...</div>
                  ) : !resourcesData?.resources?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No resources yet. Add your first resource!</div>
                  ) : (
                    <div className="space-y-4">
                      {resourcesData.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between gap-4 p-4 border rounded-md" data-testid={`resource-${resource.id}`}>
                          <div className="flex-1">
                            <h3 className="font-semibold">{resource.title}</h3>
                            {resource.description && <p className="text-sm text-muted-foreground line-clamp-1">{resource.description}</p>}
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="outline"><FileText className="w-3 h-3 mr-1" />{resource.type}</Badge>
                              {resource.link && <Badge variant="secondary">Has Link</Badge>}
                            </div>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => {
                            if (confirm(`Delete resource "${resource.title}"?`)) {
                              deleteResourceMutation.mutate(resource.id);
                            }
                          }} data-testid={`button-delete-resource-${resource.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Application Requests
                  </CardTitle>
                  <CardDescription>Requests submitted via program applications and registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  {requestsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading requests...</div>
                  ) : !requestsData?.requests?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No requests yet</div>
                  ) : (
                    <div className="space-y-4">
                      {requestsData.requests.map((req) => {
                        const messageLines = req.message?.split('\n') || [];
                        const programInfo = messageLines.find(l => l.startsWith('Application for:') || l.startsWith('Membership Plan:'));
                        const otherInfo = messageLines.filter(l => !l.startsWith('Application for:') && !l.startsWith('Membership Plan:')).join('\n').trim();
                        
                        return (
                        <div key={req.id} className={`p-4 border rounded-md ${req.status === 'pending' ? 'bg-muted/60 border-primary/30' : 'bg-muted/30'}`} data-testid={`request-${req.id}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-semibold">{req.name}</span>
                                <span className="text-muted-foreground text-sm">{req.email}</span>
                                {req.phone && <span className="text-muted-foreground text-sm">| {req.phone}</span>}
                                <Badge variant={req.status === 'pending' ? 'default' : req.status === 'approved' ? 'secondary' : 'destructive'}>
                                  {req.status}
                                </Badge>
                              </div>
                              <div className="flex gap-2 mb-2 flex-wrap">
                                <Badge variant="outline">{req.requestType.replace(/_/g, ' ')}</Badge>
                                {req.organization && <Badge variant="secondary">{req.organization}</Badge>}
                              </div>
                              {programInfo && <p className="text-sm font-medium mb-1">{programInfo}</p>}
                              {otherInfo && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{otherInfo}</p>}
                              <p className="text-xs text-muted-foreground mt-2">{new Date(req.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              {req.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => updateRequestStatusMutation.mutate({ id: req.id, status: 'approved' })}
                                    data-testid={`button-approve-${req.id}`}
                                  >
                                    <Check className="w-4 h-4 text-green-600" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => updateRequestStatusMutation.mutate({ id: req.id, status: 'rejected' })}
                                    data-testid={`button-reject-${req.id}`}
                                  >
                                    <X className="w-4 h-4 text-red-600" />
                                  </Button>
                                </>
                              )}
                              <Button variant="destructive" size="icon" onClick={() => {
                                if (confirm("Delete this request?")) {
                                  deleteRequestMutation.mutate(req.id);
                                }
                              }} data-testid={`button-delete-request-${req.id}`}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>Messages sent through the contact form</CardDescription>
                </CardHeader>
                <CardContent>
                  {messagesLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
                  ) : !messagesData?.messages?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No messages yet</div>
                  ) : (
                    <div className="space-y-4">
                      {messagesData.messages.map((msg) => (
                        <div key={msg.id} className={`p-4 border rounded-md ${msg.isRead ? 'bg-muted/30' : 'bg-muted/60 border-primary/30'}`} data-testid={`message-${msg.id}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-semibold">{msg.name}</span>
                                <span className="text-muted-foreground text-sm">{msg.email}</span>
                                {!msg.isRead && <Badge variant="default">New</Badge>}
                              </div>
                              {msg.subject && <p className="font-medium mb-1">{msg.subject}</p>}
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              {!msg.isRead && (
                                <Button variant="outline" size="icon" onClick={() => markMessageReadMutation.mutate(msg.id)} data-testid={`button-mark-read-${msg.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              )}
                              <Button variant="destructive" size="icon" onClick={() => {
                                if (confirm("Delete this message?")) {
                                  deleteMessageMutation.mutate(msg.id);
                                }
                              }} data-testid={`button-delete-message-${msg.id}`}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memberships">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle>Membership Tokens</CardTitle>
                    <CardDescription>Manage membership records and tokens</CardDescription>
                  </div>
                  <Dialog open={membershipDialogOpen} onOpenChange={setMembershipDialogOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-membership"><Plus className="w-4 h-4 mr-2" />Add Membership</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Membership</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="membership-name">Name</Label>
                          <Input id="membership-name" value={membershipForm.name} onChange={(e) => setMembershipForm({...membershipForm, name: e.target.value})} data-testid="input-membership-name" />
                        </div>
                        <div>
                          <Label htmlFor="membership-email">Email</Label>
                          <Input id="membership-email" type="email" value={membershipForm.email} onChange={(e) => setMembershipForm({...membershipForm, email: e.target.value})} data-testid="input-membership-email" />
                        </div>
                        <div>
                          <Label htmlFor="membership-phone">Phone (optional)</Label>
                          <Input id="membership-phone" value={membershipForm.phone} onChange={(e) => setMembershipForm({...membershipForm, phone: e.target.value})} data-testid="input-membership-phone" />
                        </div>
                        <div>
                          <Label htmlFor="membership-organization">Organization (optional)</Label>
                          <Input id="membership-organization" value={membershipForm.organization} onChange={(e) => setMembershipForm({...membershipForm, organization: e.target.value})} data-testid="input-membership-organization" />
                        </div>
                        <div>
                          <Label htmlFor="membership-type">Membership Type</Label>
                          <Select value={membershipForm.membershipType} onValueChange={(value) => setMembershipForm({...membershipForm, membershipType: value})}>
                            <SelectTrigger data-testid="select-membership-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="startup">Startup</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="institutional">Institutional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="membership-notes">Notes (optional)</Label>
                          <Textarea id="membership-notes" value={membershipForm.notes} onChange={(e) => setMembershipForm({...membershipForm, notes: e.target.value})} data-testid="input-membership-notes" />
                        </div>
                        <Button onClick={() => createMembershipMutation.mutate(membershipForm)} disabled={createMembershipMutation.isPending || !membershipForm.name || !membershipForm.email} className="w-full" data-testid="button-submit-membership">
                          {createMembershipMutation.isPending ? "Creating..." : "Create Membership"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {membershipsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading memberships...</div>
                  ) : !membershipsData?.memberships?.length ? (
                    <div className="text-center py-8 text-muted-foreground">No memberships yet. Add your first membership!</div>
                  ) : (
                    <div className="space-y-4">
                      {membershipsData.memberships.map((membership) => (
                        <div key={membership.id} className="flex items-center justify-between gap-4 p-4 border rounded-md" data-testid={`membership-${membership.id}`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{membership.name}</h3>
                              <Badge variant={membership.status === 'active' ? 'default' : 'secondary'}>{membership.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{membership.email}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="outline"><Ticket className="w-3 h-3 mr-1" />{membership.membershipType}</Badge>
                              {membership.organization && <Badge variant="secondary">{membership.organization}</Badge>}
                            </div>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => {
                            if (confirm(`Delete membership for "${membership.name}"?`)) {
                              deleteMembershipMutation.mutate(membership.id);
                            }
                          }} data-testid={`button-delete-membership-${membership.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
