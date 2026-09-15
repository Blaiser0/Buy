import { HomeBestSellers } from "@/components/home/home-best-sellers";
import { HomeCategoryIcons } from "@/components/home/home-category-icons";
import { HomeCommitments } from "@/components/home/home-commitments";
import { HomeHero } from "@/components/home/home-hero";
import { HomeNewsletter } from "@/components/home/home-newsletter";
import { HomeRoutine } from "@/components/home/home-routine";
import { getDb } from "@/lib/db";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata(HOME_TITLE, HOME_DESCRIPTION, "/", "/logo.png");

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: ["https://www.tiktok.com/@buyu_puertomaldonado"],
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = getDb();
  const products = await db.products.list();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organization) }} />
      <HomeHero />
      <HomeCategoryIcons />
      <HomeBestSellers products={products} />
      <HomeCommitments />
      <HomeRoutine />
      <HomeNewsletter />
    </>
  );
}
