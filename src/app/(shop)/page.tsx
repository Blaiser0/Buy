import { HomeBestSellers } from "@/components/home/home-best-sellers";
import { HomeCategoryIcons } from "@/components/home/home-category-icons";
import { HomeCommitments } from "@/components/home/home-commitments";
import { HomeHero } from "@/components/home/home-hero";
import { HomeNewsletter } from "@/components/home/home-newsletter";
import { HomeRoutine } from "@/components/home/home-routine";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = getDb();
  const products = await db.products.list();

  return (
    <>
      <HomeHero />
      <HomeCategoryIcons />
      <HomeBestSellers products={products} />
      <HomeCommitments />
      <HomeRoutine />
      <HomeNewsletter />
    </>
  );
}
