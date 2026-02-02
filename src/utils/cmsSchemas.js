export const cmsSchemas = {
  "about.videohero": {
    label: "About - Video Hero",
    fields: ["heading"],
  },

  "about.infosection": {
    label: "About - Info Section",
    fields: ["heading", "description", "image"],
  },
  "about.howitworks": {
    label: "About - How It Works",
    fields: [
      "heading",
      "description",
      "steps" 
    ],
  },
   "about.faq": {
    label: "About - FAQ Section",
    fields: ["heading", "description", "faqs"], // 🔥
  },

  "privacy.policy": {
    label: "Privacy Policy",
    fields: ["html"],
  },
};
