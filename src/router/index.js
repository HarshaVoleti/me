import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const DEFAULT_TITLE = "Harsha Voleti — Full-Stack Product Engineer";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: DEFAULT_TITLE },
    },
    {
      path: "/blogs",
      name: "blog-list",
      component: () => import("../views/BlogListView.vue"),
      meta: { title: "Blog — Harsha Voleti" },
    },
    {
      path: "/blogs/:slug",
      name: "blog-detail",
      component: () => import("../views/BlogDetailView.vue"),
      // document title is set dynamically once the post loads
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title;
});

export default router;
export { DEFAULT_TITLE };
