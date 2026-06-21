import { Badge } from "@/components/ui/badge";

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      <Badge variant="outline">{eyebrow}</Badge>
      <h1 className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
    </div>
  );
}
