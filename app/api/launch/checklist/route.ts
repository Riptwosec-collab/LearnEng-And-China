import { launchChecklist } from "@/lib/data/phase12-launch";

export async function GET() {
  return Response.json({ launchChecklist });
}
