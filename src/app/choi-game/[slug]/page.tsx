import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/catalog";
import GameArenaClient from "@/components/GameArenaClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) {
    return { title: "Game không tồn tại | app.zeebee.vn" };
  }
  return {
    title: `Chơi ${product.name} — Đấu 2 Người / Online / Offline PWA | Zeebee`,
    description: product.tagline,
  };
}

export default async function PlayGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <GameArenaClient product={product} />;
}
