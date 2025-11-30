import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { User, Mail, Calendar, Shield, LogOut, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
    }
  }, [user, loading, setLocation]);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E46E6E]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your Kerala Economic Forum membership and access exclusive resources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-[#E46E6E]/10 rounded-full">
                  <User className="h-6 w-6 text-[#E46E6E]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-[#6EC9C6]/10 rounded-full">
                  <Shield className="h-6 w-6 text-[#6EC9C6]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Membership</CardTitle>
                  <CardDescription>Your current plan</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-[#E7D26A]/20 text-[#b5a44d] rounded-full text-sm font-medium">
                    Free Member
                  </span>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setLocation('/membership')}>
                    Upgrade Plan <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-[#E7D26A]/10 rounded-full">
                  <Calendar className="h-6 w-6 text-[#c4b44a]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  <CardDescription>Your registered events</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">No upcoming events registered.</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setLocation('/events')}>
                  Browse Events <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your most-used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/programs')}>
                  <span className="text-2xl mb-2">📚</span>
                  <span>Programs</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/resources')}>
                  <span className="text-2xl mb-2">📁</span>
                  <span>Resources</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/startup-support')}>
                  <span className="text-2xl mb-2">🚀</span>
                  <span>Startup Support</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/contact')}>
                  <span className="text-2xl mb-2">💬</span>
                  <span>Contact Us</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
