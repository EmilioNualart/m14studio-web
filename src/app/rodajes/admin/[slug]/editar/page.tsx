import { notFound } from "next/navigation";
import { getBySlug } from "@/lib/rodajes";
import RodajeForm from "../../RodajeForm";

export const dynamic = "force-dynamic";

export default async function EditarRodajePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shoot = await getBySlug(slug);
  if (!shoot) notFound();
  return <RodajeForm initial={shoot} />;
}
