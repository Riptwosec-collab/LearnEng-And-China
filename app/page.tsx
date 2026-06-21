import { Hero } from "@/components/home/hero";
import { categories } from "@/lib/data/categories";
import { learningPaths } from "@/lib/data/learning-paths";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PathCard } from "@/components/dashboard/path-card";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <Badge variant="outline">Real-life categories</Badge>
            <h2 className="mt-3 text-3xl font-black">หมวดชีวิตประจำวันที่ต้องใช้จริง</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 12).map((category) => (
            <Card key={category.id} className="p-4">
              <div className="text-3xl">{category.icon}</div>
              <h3 className="mt-3 font-bold">{category.nameTh}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {learningPaths.slice(0, 2).map((path) => <PathCard key={path.id} path={path} />)}
        </div>
      </section>
    </main>
  );
}
