import LocalFont from "next/font/local";
const iranFont = LocalFont({
  src: [
    {
      path: "../../public/fonts/IRANSansX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-DemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Bold.woff2",
      weight: "700",
      style: "normal",
    },

  ],
  variable: "--font-iransans",
  style: "normal",
  display: "swap"
});

export default iranFont;
