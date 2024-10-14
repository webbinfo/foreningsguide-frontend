import type { Metadata } from "next";
import "./globals.css";
import { fetchAPI } from "./utils/fetch-api";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import Navbar from "./components/elements/Navbar";
import { FALLBACK_SEO } from "./utils/constants";
import Footer from "./components/elements/Footer";
import Banner from "./components/elements/Banner";
import { CookieDialog } from "./components/elements/CookieDialog";
import Script from "next/script";

async function getConfig(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("Missing STRAPI api token");

  const path = "/config";
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "navbar.links",
      "navbar.button",
      "navbar.logo.title",
      "navbar.logo.logoImage",
      "notificationBanner",
      "notificationBanner.link",
      "footer.left",
      "footer.left.sponsoredLogo",
      "footer.right",
      "footer.middleTopTitle",
      "footer.middleTopLogos.image",
      "footer.middleBottomTitle",
      "footer.middleBottomLogos.image",
      "footer.middleBottomLogoSpotlight.image",
      "favicon",
      "metadata",
      "cookies"
    ]
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetaData(): Promise<Metadata> {
  const meta = await getConfig();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;
  
  const concatTitle = `Föreningsguiden - ${metadata.metaTitle}`;
  return {
    title: concatTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    }
  }
}

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const config = await getConfig();
  if (!config.data) return null;
  const { notificationBanner, navbar, footer, cookies } = config.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.logo.logoImage.data?.attributes.formats.thumbnail.url
  );

  return (
    <html lang='sv'>
      <head>
        <meta name="robots" content="noindex" />
        <meta charSet="UTF-8" />

        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-9DCPGVWMP8`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied'
          });

          gtag('config', 'G-9DCPGVWMP8');
        `}
      </Script>
        <link rel="icon" href={navbarLogoUrl ?? "/favicon.ico"}/>
        <link rel="apple-touch-icon" href={navbarLogoUrl ?? "/favicon.ico"}/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"/>
      </head>
      <body>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.logo.title}
          button={navbar.button}
        />

        <main>
          {children}
        </main>

        <CookieDialog data={cookies}/>
        <Banner data={notificationBanner} />

        <Footer data={footer} />
      </body>
    </html>
  );
}