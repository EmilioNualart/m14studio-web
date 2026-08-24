import { listAll } from "@/lib/rodajes";
import Calendar from "./Calendar";

export const dynamic = "force-dynamic";

export default async function CalendarioPage() {
  const shoots = await listAll();
  return <Calendar shoots={shoots} />;
}
