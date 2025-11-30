import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { KEFLogo } from "@/components/KEFLogo";
import { queryClient } from "@/lib/queryClient";

interface SessionUser {
  id: string;
  username: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      { label: "All Programs", href: "/programs" },
      { label: "Startup Support", href: "/startup-support" },
      { label: "Campus Initiatives", href: "/campus" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Membership", href: "/membership" },
  { label: "Resources", href: "/resources" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const { data: authData, isLoading: loading } = useQuery<{ user: SessionUser } | null>({
    queryKey: ['/api/auth/me'],
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 401) {
        return null;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }
      return res.json();
    },
  });

  const user = authData?.user || null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('kef_user');
    queryClient.clear();
    setLocation('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0" data-testid="link-logo">
            <KEFLogo className="h-12 md:h-16 lg:h-24 w-auto max-w-48" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1 ${location.startsWith(item.href) ? "text-primary" : ""}`}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem 
                        key={subItem.href} 
                        onClick={() => setLocation(subItem.href)}
                        data-testid={`nav-${subItem.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className={location === item.href ? "text-primary" : ""}
                  onClick={() => setLocation(item.href)}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {item.label}
                </Button>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="max-w-32 truncate">
                        {user.name || user.username || user.email?.split('@')[0]}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setLocation("/membership")}
                    data-testid="button-get-started"
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setLocation("/membership")}
                    data-testid="button-join"
                  >
                    Join KEF
                  </Button>
                </>
              )
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={`w-full justify-start ${location === item.href ? "text-primary bg-primary/5" : ""}`}
                    onClick={() => {
                      setLocation(item.href);
                      setIsOpen(false);
                    }}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  {!loading && (
                    user ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setLocation("/dashboard");
                            setIsOpen(false);
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full text-red-600"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => {
                            setLocation("/membership");
                            setIsOpen(false);
                          }}
                          data-testid="mobile-button-get-started"
                        >
                          Get Started
                        </Button>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setLocation("/membership");
                            setIsOpen(false);
                          }}
                          data-testid="mobile-button-join"
                        >
                          Join KEF
                        </Button>
                      </>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
