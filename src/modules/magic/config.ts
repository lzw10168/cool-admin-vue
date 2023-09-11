import { ModuleConfig } from "/@/cool";

export default (): ModuleConfig => {
  return {
    views: [
      {
        path: "/magic/ai-code",
        meta: {
          label: "--",
          keepAlive: true
        },
        component: () => import("./views/ai-code.vue")
      }
    ]
  };
};
