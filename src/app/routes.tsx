import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Feed } from "./pages/Feed";
import { CreatePost } from "./pages/CreatePost";
import { Bookmarks } from "./pages/Bookmarks";
import { Profile } from "./pages/Profile";
import { Messages } from "./pages/Messages";
import { EventsFeed } from "./pages/EventsFeed";
import { EventDetail } from "./pages/EventDetail";
import { CreateEvent } from "./pages/CreateEvent";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { LiveActivities } from "./pages/LiveActivities";
import { Rewards } from "./pages/Rewards";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminPosts } from "./pages/AdminPosts";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminOrganizerVerification } from "./pages/AdminOrganizerVerification";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { NotFound } from "./pages/NotFound";
import { InteractionDemo } from "./pages/InteractionDemo";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Feed },
      { path: "interaction-demo", Component: InteractionDemo },
      { path: "create-post", Component: CreatePost },
      { path: "bookmarks", Component: Bookmarks },
      { path: "profile/:username?", Component: Profile },
      { path: "messages", Component: Messages },
      { path: "events", Component: EventsFeed },
      { path: "events/:id", Component: EventDetail },
      { path: "create-event", Component: CreateEvent },
      { path: "organizer-dashboard", Component: OrganizerDashboard },
      { path: "live-activities/:eventId", Component: LiveActivities },
      { path: "rewards", Component: Rewards },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/posts", Component: AdminPosts },
      { path: "admin/users", Component: AdminUsers },
      { path: "admin/organizer-verification", Component: AdminOrganizerVerification },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
]);