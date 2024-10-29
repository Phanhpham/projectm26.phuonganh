import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const routes = [...userRoutes, ...authRoutes, ...adminRoutes];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;