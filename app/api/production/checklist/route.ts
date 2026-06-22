import { deploymentSteps, envChecklist, performanceBudget, securityChecklist } from "@/lib/data/phase10-production";

export async function GET() {
  return Response.json({ envChecklist, securityChecklist, performanceBudget, deploymentSteps });
}
