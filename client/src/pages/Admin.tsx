import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Shield, TrendingUp, Calendar, ArrowLeft, UserMinus } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string | null;
  signupOrder: number;
  isAdmin: boolean;
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  adminCount: number;
  recentSignups: AdminUser[];
}

export default function Admin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

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
        description: "You don't have admin privileges. Only the first 4 signups have admin access.",
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

  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest("PATCH", `/api/admin/users/${userId}/remove-admin`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Admin Removed",
        description: "Admin privileges have been removed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove admin privileges",
        variant: "destructive",
      });
    },
  });

  const handleRemoveAdmin = (userId: string, username: string) => {
    if (confirm(`Are you sure you want to remove admin privileges from ${username}?`)) {
      removeAdminMutation.mutate(userId);
    }
  };

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
            <CardDescription>
              Only the first 4 users to sign up have admin access.
            </CardDescription>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-admin-title">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">
                Manage users and view platform statistics
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Shield className="w-3 h-3" />
              Admin #{currentUser?.signupOrder}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card data-testid="card-total-users">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.totalUsers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered members
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-admin-count">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.adminCount || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  First 4 signups with admin access
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-growth">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-kef-teal">Active</div>
                <p className="text-xs text-muted-foreground">
                  Platform is growing
                </p>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-users-list">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage all registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading users...
                </div>
              ) : !usersData?.users?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users registered yet
                </div>
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
                        <th className="text-left py-3 px-4 font-medium">Joined</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.users.map((user) => (
                        <tr 
                          key={user.id} 
                          className="border-b hover-elevate"
                          data-testid={`row-user-${user.id}`}
                        >
                          <td className="py-3 px-4">{user.signupOrder}</td>
                          <td className="py-3 px-4 font-medium">{user.username}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4">{user.name || "-"}</td>
                          <td className="py-3 px-4">
                            {user.isAdmin ? (
                              <Badge variant="default">
                                <Shield className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Member</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {user.isAdmin && user.id !== currentUser?.id && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveAdmin(user.id, user.username)}
                                disabled={removeAdminMutation.isPending}
                                data-testid={`button-remove-admin-${user.id}`}
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

          <div className="mt-8">
            <Card data-testid="card-recent-signups">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Signups
                </CardTitle>
                <CardDescription>
                  Latest users to join the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading...
                  </div>
                ) : !stats?.recentSignups?.length ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent signups
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.recentSignups.map((user) => (
                      <div 
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-md bg-muted/50"
                        data-testid={`recent-user-${user.id}`}
                      >
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          {user.isAdmin && (
                            <Badge variant="default" className="mb-1">
                              Admin
                            </Badge>
                          )}
                          <p className="text-sm text-muted-foreground">
                            #{user.signupOrder}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
