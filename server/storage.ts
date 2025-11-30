import { 
  type User, type InsertUser, users,
  type Program, type InsertProgram, programs,
  type Event, type InsertEvent, events,
  type Resource, type InsertResource, resources,
  type Membership, type InsertMembership, memberships,
  type ContactMessage, type InsertContactMessage, contactMessages,
  type Request, type InsertRequest, requests,
  type MembershipPlan, type InsertMembershipPlan, membershipPlans
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserCount(): Promise<number>;
  getAllUsers(): Promise<User[]>;
  getAdminUsers(): Promise<User[]>;
  updateUserAdminStatus(id: string, isAdmin: boolean): Promise<User | undefined>;

  getPrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined>;
  deleteProgram(id: string): Promise<boolean>;

  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  getResources(): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: string): Promise<boolean>;

  getMemberships(): Promise<Membership[]>;
  getMembership(id: string): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  updateMembership(id: string, membership: Partial<InsertMembership>): Promise<Membership | undefined>;
  deleteMembership(id: string): Promise<boolean>;

  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: string): Promise<boolean>;

  getRequests(): Promise<Request[]>;
  getRequest(id: string): Promise<Request | undefined>;
  createRequest(request: InsertRequest): Promise<Request>;
  updateRequestStatus(id: string, status: string): Promise<Request | undefined>;
  deleteRequest(id: string): Promise<boolean>;

  getMembershipPlans(): Promise<MembershipPlan[]>;
  getMembershipPlan(id: string): Promise<MembershipPlan | undefined>;
  createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan>;
  updateMembershipPlan(id: string, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan | undefined>;
  deleteMembershipPlan(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(users);
    return Number(result[0]?.count || 0);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const currentCount = await this.getUserCount();
    const signupOrder = currentCount + 1;
    const isAdmin = signupOrder <= 4;

    const [user] = await db.insert(users).values({
      ...insertUser,
      signupOrder,
      isAdmin,
    }).returning();
    
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getAdminUsers(): Promise<User[]> {
    return db.select().from(users).where(eq(users.isAdmin, true));
  }

  async updateUserAdminStatus(id: string, isAdmin: boolean): Promise<User | undefined> {
    const [updated] = await db.update(users).set({ isAdmin }).where(eq(users.id, id)).returning();
    return updated;
  }

  async getPrograms(): Promise<Program[]> {
    return db.select().from(programs).orderBy(desc(programs.createdAt));
  }

  async getProgram(id: string): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const [created] = await db.insert(programs).values(program).returning();
    return created;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined> {
    const [updated] = await db.update(programs).set(program).where(eq(programs.id, id)).returning();
    return updated;
  }

  async deleteProgram(id: string): Promise<boolean> {
    const result = await db.delete(programs).where(eq(programs.id, id));
    return true;
  }

  async getEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(desc(events.date));
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const [updated] = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    await db.delete(events).where(eq(events.id, id));
    return true;
  }

  async getResources(): Promise<Resource[]> {
    return db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [created] = await db.insert(resources).values(resource).returning();
    return created;
  }

  async updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined> {
    const [updated] = await db.update(resources).set(resource).where(eq(resources.id, id)).returning();
    return updated;
  }

  async deleteResource(id: string): Promise<boolean> {
    await db.delete(resources).where(eq(resources.id, id));
    return true;
  }

  async getMemberships(): Promise<Membership[]> {
    return db.select().from(memberships).orderBy(desc(memberships.createdAt));
  }

  async getMembership(id: string): Promise<Membership | undefined> {
    const [membership] = await db.select().from(memberships).where(eq(memberships.id, id));
    return membership;
  }

  async createMembership(membership: InsertMembership): Promise<Membership> {
    const [created] = await db.insert(memberships).values(membership).returning();
    return created;
  }

  async updateMembership(id: string, membership: Partial<InsertMembership>): Promise<Membership | undefined> {
    const [updated] = await db.update(memberships).set(membership).where(eq(memberships.id, id)).returning();
    return updated;
  }

  async deleteMembership(id: string): Promise<boolean> {
    await db.delete(memberships).where(eq(memberships.id, id));
    return true;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async markMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const [updated] = await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id)).returning();
    return updated;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }

  async getRequests(): Promise<Request[]> {
    return db.select().from(requests).orderBy(desc(requests.createdAt));
  }

  async getRequest(id: string): Promise<Request | undefined> {
    const [request] = await db.select().from(requests).where(eq(requests.id, id));
    return request;
  }

  async createRequest(request: InsertRequest): Promise<Request> {
    const [created] = await db.insert(requests).values(request).returning();
    return created;
  }

  async updateRequestStatus(id: string, status: string): Promise<Request | undefined> {
    const [updated] = await db.update(requests).set({ status }).where(eq(requests.id, id)).returning();
    return updated;
  }

  async deleteRequest(id: string): Promise<boolean> {
    await db.delete(requests).where(eq(requests.id, id));
    return true;
  }

  async getMembershipPlans(): Promise<MembershipPlan[]> {
    return db.select().from(membershipPlans).orderBy(desc(membershipPlans.createdAt));
  }

  async getMembershipPlan(id: string): Promise<MembershipPlan | undefined> {
    const [plan] = await db.select().from(membershipPlans).where(eq(membershipPlans.id, id));
    return plan;
  }

  async createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan> {
    const [created] = await db.insert(membershipPlans).values(plan).returning();
    return created;
  }

  async updateMembershipPlan(id: string, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan | undefined> {
    const [updated] = await db.update(membershipPlans).set(plan).where(eq(membershipPlans.id, id)).returning();
    return updated;
  }

  async deleteMembershipPlan(id: string): Promise<boolean> {
    await db.delete(membershipPlans).where(eq(membershipPlans.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
