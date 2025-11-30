import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertProgramSchema, 
  insertEventSchema, 
  insertResourceSchema, 
  insertMembershipSchema, 
  insertContactMessageSchema,
  insertRequestSchema,
  insertMembershipPlanSchema
} from "@shared/schema";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (!req.session.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  };
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }

      const { username, email, password, name } = parsed.data;

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        name: name || null,
      });

      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ error: "Registration failed" });
        }

        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;

        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/oauth-signup", async (req, res) => {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
        user = await storage.createUser({
          email,
          name: name || null,
          username: username,
          password: "",
        });
      }

      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ error: "OAuth signup failed" });
        }

        req.session.userId = user!.id;
        req.session.isAdmin = user!.isAdmin;

        const { password: _, ...userWithoutPassword } = user!;
        res.status(201).json({ user: userWithoutPassword });
      });
    } catch (error) {
      console.error("OAuth signup error:", error);
      res.status(500).json({ error: "OAuth signup failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ error: "Login failed" });
        }

        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ error: "User not found" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json({ users: usersWithoutPasswords });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.patch("/api/admin/users/:id/remove-admin", requireAdmin, async (req, res) => {
    try {
      const targetUserId = req.params.id;
      const currentUserId = req.session.userId;

      console.log(`[Admin Removal] Attempting to remove admin from user ${targetUserId} by admin ${currentUserId}`);

      if (targetUserId === currentUserId) {
        console.log(`[Admin Removal] Blocked: User tried to remove their own admin privileges`);
        return res.status(400).json({ error: "You cannot remove your own admin privileges" });
      }

      const targetUser = await storage.getUser(targetUserId);
      if (!targetUser) {
        console.log(`[Admin Removal] Failed: Target user ${targetUserId} not found`);
        return res.status(404).json({ error: "User not found" });
      }

      if (!targetUser.isAdmin) {
        console.log(`[Admin Removal] Skipped: User ${targetUser.email} is already not an admin`);
        return res.status(400).json({ error: "User is not an admin" });
      }

      console.log(`[Admin Removal] Updating admin status for ${targetUser.email} (${targetUserId})`);
      const updatedUser = await storage.updateUserAdminStatus(targetUserId, false);
      
      if (!updatedUser) {
        console.error(`[Admin Removal] CRITICAL: Database update returned undefined for user ${targetUserId}`);
        return res.status(500).json({ error: "Failed to update user" });
      }

      // Verify the change persisted
      const verifyUser = await storage.getUser(targetUserId);
      if (verifyUser?.isAdmin) {
        console.error(`[Admin Removal] CRITICAL: Admin status not persisted! User ${targetUserId} still has isAdmin=true after update`);
        return res.status(500).json({ error: "Failed to persist admin removal" });
      }

      console.log(`[Admin Removal] SUCCESS: Admin privileges removed from ${targetUser.email}. isAdmin is now ${updatedUser.isAdmin}`);
      
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword, message: "Admin privileges removed successfully" });
    } catch (error) {
      console.error("[Admin Removal] Error:", error);
      res.status(500).json({ error: "Failed to remove admin privileges" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const adminUsers = await storage.getAdminUsers();
      const programs = await storage.getPrograms();
      const events = await storage.getEvents();
      const resources = await storage.getResources();
      const memberships = await storage.getMemberships();
      const messages = await storage.getContactMessages();
      const unreadMessages = messages.filter(m => !m.isRead).length;

      res.json({
        totalUsers: users.length,
        adminCount: adminUsers.length,
        programCount: programs.length,
        eventCount: events.length,
        resourceCount: resources.length,
        membershipCount: memberships.length,
        messageCount: messages.length,
        unreadMessageCount: unreadMessages,
        recentSignups: users.slice(-5).map(({ password, ...user }) => user),
      });
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      res.json({ programs });
    } catch (error) {
      console.error("Get programs error:", error);
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.getProgram(req.params.id);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json({ program });
    } catch (error) {
      console.error("Get program error:", error);
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  app.post("/api/admin/programs", requireAdmin, async (req, res) => {
    try {
      const parsed = insertProgramSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const program = await storage.createProgram(parsed.data);
      res.status(201).json({ program });
    } catch (error) {
      console.error("Create program error:", error);
      res.status(500).json({ error: "Failed to create program" });
    }
  });

  app.patch("/api/admin/programs/:id", requireAdmin, async (req, res) => {
    try {
      const program = await storage.updateProgram(req.params.id, req.body);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json({ program });
    } catch (error) {
      console.error("Update program error:", error);
      res.status(500).json({ error: "Failed to update program" });
    }
  });

  app.delete("/api/admin/programs/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProgram(req.params.id);
      res.json({ message: "Program deleted" });
    } catch (error) {
      console.error("Delete program error:", error);
      res.status(500).json({ error: "Failed to delete program" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json({ events });
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ event });
    } catch (error) {
      console.error("Get event error:", error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/admin/events", requireAdmin, async (req, res) => {
    try {
      const parsed = insertEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const event = await storage.createEvent(parsed.data);
      res.status(201).json({ event });
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  app.patch("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const event = await storage.updateEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ event });
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  });

  app.delete("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.json({ message: "Event deleted" });
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json({ resources });
    } catch (error) {
      console.error("Get resources error:", error);
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResource(req.params.id);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json({ resource });
    } catch (error) {
      console.error("Get resource error:", error);
      res.status(500).json({ error: "Failed to fetch resource" });
    }
  });

  app.post("/api/admin/resources", requireAdmin, async (req, res) => {
    try {
      const parsed = insertResourceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const resource = await storage.createResource(parsed.data);
      res.status(201).json({ resource });
    } catch (error) {
      console.error("Create resource error:", error);
      res.status(500).json({ error: "Failed to create resource" });
    }
  });

  app.patch("/api/admin/resources/:id", requireAdmin, async (req, res) => {
    try {
      const resource = await storage.updateResource(req.params.id, req.body);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json({ resource });
    } catch (error) {
      console.error("Update resource error:", error);
      res.status(500).json({ error: "Failed to update resource" });
    }
  });

  app.delete("/api/admin/resources/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteResource(req.params.id);
      res.json({ message: "Resource deleted" });
    } catch (error) {
      console.error("Delete resource error:", error);
      res.status(500).json({ error: "Failed to delete resource" });
    }
  });

  app.get("/api/admin/memberships", requireAdmin, async (req, res) => {
    try {
      const memberships = await storage.getMemberships();
      res.json({ memberships });
    } catch (error) {
      console.error("Get memberships error:", error);
      res.status(500).json({ error: "Failed to fetch memberships" });
    }
  });

  app.post("/api/admin/memberships", requireAdmin, async (req, res) => {
    try {
      const parsed = insertMembershipSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const membership = await storage.createMembership(parsed.data);
      res.status(201).json({ membership });
    } catch (error) {
      console.error("Create membership error:", error);
      res.status(500).json({ error: "Failed to create membership" });
    }
  });

  app.patch("/api/admin/memberships/:id", requireAdmin, async (req, res) => {
    try {
      const membership = await storage.updateMembership(req.params.id, req.body);
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.json({ membership });
    } catch (error) {
      console.error("Update membership error:", error);
      res.status(500).json({ error: "Failed to update membership" });
    }
  });

  app.delete("/api/admin/memberships/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteMembership(req.params.id);
      res.json({ message: "Membership deleted" });
    } catch (error) {
      console.error("Delete membership error:", error);
      res.status(500).json({ error: "Failed to delete membership" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const message = await storage.createContactMessage(parsed.data);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Create contact message error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/admin/messages", requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ messages });
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.patch("/api/admin/messages/:id/read", requireAdmin, async (req, res) => {
    try {
      const message = await storage.markMessageAsRead(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json({ message });
    } catch (error) {
      console.error("Mark message read error:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteContactMessage(req.params.id);
      res.json({ message: "Message deleted" });
    } catch (error) {
      console.error("Delete message error:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  app.post("/api/requests", async (req, res) => {
    try {
      const parsed = insertRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const request = await storage.createRequest(parsed.data);
      res.status(201).json({ request, message: "Request submitted successfully" });
    } catch (error) {
      console.error("Create request error:", error);
      res.status(500).json({ error: "Failed to submit request" });
    }
  });

  app.get("/api/admin/requests", requireAdmin, async (req, res) => {
    try {
      const requests = await storage.getRequests();
      res.json({ requests });
    } catch (error) {
      console.error("Get requests error:", error);
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.patch("/api/admin/requests/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const request = await storage.updateRequestStatus(req.params.id, status);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json({ request });
    } catch (error) {
      console.error("Update request status error:", error);
      res.status(500).json({ error: "Failed to update request status" });
    }
  });

  app.delete("/api/admin/requests/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteRequest(req.params.id);
      res.json({ message: "Request deleted" });
    } catch (error) {
      console.error("Delete request error:", error);
      res.status(500).json({ error: "Failed to delete request" });
    }
  });

  app.get("/api/membership-plans", async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json({ plans: plans.filter(p => p.isActive) });
    } catch (error) {
      console.error("Get membership plans error:", error);
      res.status(500).json({ error: "Failed to fetch membership plans" });
    }
  });

  app.get("/api/admin/membership-plans", requireAdmin, async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json({ plans });
    } catch (error) {
      console.error("Get all membership plans error:", error);
      res.status(500).json({ error: "Failed to fetch membership plans" });
    }
  });

  app.post("/api/admin/membership-plans", requireAdmin, async (req, res) => {
    try {
      const parsed = insertMembershipPlanSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.errors });
      }
      const plan = await storage.createMembershipPlan(parsed.data);
      res.status(201).json({ plan });
    } catch (error) {
      console.error("Create membership plan error:", error);
      res.status(500).json({ error: "Failed to create membership plan" });
    }
  });

  app.patch("/api/admin/membership-plans/:id", requireAdmin, async (req, res) => {
    try {
      const plan = await storage.updateMembershipPlan(req.params.id, req.body);
      if (!plan) {
        return res.status(404).json({ error: "Membership plan not found" });
      }
      res.json({ plan });
    } catch (error) {
      console.error("Update membership plan error:", error);
      res.status(500).json({ error: "Failed to update membership plan" });
    }
  });

  app.delete("/api/admin/membership-plans/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteMembershipPlan(req.params.id);
      res.json({ message: "Membership plan deleted" });
    } catch (error) {
      console.error("Delete membership plan error:", error);
      res.status(500).json({ error: "Failed to delete membership plan" });
    }
  });

  app.get("/api/auth/google", (req, res) => {
    const supabaseProjectId = process.env.SUPABASE_PROJECT_ID || '';
    const origin = req.headers.origin || 'http://localhost:5000';
    const redirectUrl = `https://${supabaseProjectId}.supabase.co/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(origin)}/dashboard`;
    res.redirect(redirectUrl);
  });

  return httpServer;
}
