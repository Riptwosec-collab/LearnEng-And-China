import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950"><Sparkles className="size-5" /></span>
          <div>
            <h1 className="text-2xl font-black">เข้าสู่ระบบ</h1>
            <p className="text-sm text-muted-foreground">LinguaQuest AI</p>
          </div>
        </div>
        <form className="space-y-4">
          <Input type="email" placeholder="อีเมล" />
          <Input type="password" placeholder="รหัสผ่าน" />
          <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">ยังไม่มีบัญชี? <Link href="/auth/register" className="font-bold text-cyan-300">สมัครสมาชิก</Link></p>
      </Card>
    </main>
  );
}
