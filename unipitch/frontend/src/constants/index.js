import highlightFirstVideo from "../assets/videos/highlight-first.mp4";
import highlightSecondVideo from "../assets/videos/highlight-sec.mp4";
import highlightThirdVideo from "../assets/videos/highlight-third.mp4";
import highlightFourthVideo from "../assets/videos/highlight-fourth.mp4";

export const navLists = ["Services", "About Us", "Get in Touch", "Login"];

export const highlightsSlides = [
  {
    id: 1,
    textLists: [
      "Discover Unipitch.",
      "Innovative IT Solutions.",
      "Empowering your digital journey.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Tailored Development.", "Crafting digital success for you."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "Your partner in IT excellence.",
      "Streamlined processes, ",
      "outstanding results.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["Innovate with Unipitch.", "Where ideas come to life."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models = [
  {
    id: 1,
    title: "Tailored Web Solutions",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
  },
  {
    id: 2,
    title: "Custom IT Strategies",
    color: ["#53596E", "#6395ff", "#21242e"],
  },
  {
    id: 3,
    title: "Seamless User Experiences",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
  },
  {
    id: 4,
    title: "End-to-End IT Solutions",
    color: ["#454749", "#3b3b3b", "#181819"],
  },
];

export const sizes = [
  { label: 'Startup-Friendly', value: "small" },
  { label: 'Enterprise-Ready', value: "large" },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];
