import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950"><Sparkles className="size-5" /></span>
          <div>
            <h1 className="text-2xl font-black">สมัครสมาชิก</h1>
            <p className="text-sm text-muted-foreground">เริ่มเรียนอังกฤษและจีน</p>
          </div>
        </div>
        <form className="space-y-4">
          <Input placeholder="ชื่อเล่น" />
          <Input type="email" placeholder="อีเมล" />
          <Input type="password" placeholder="รหัสผ่าน" />
          <Button className="w-full" type="submit">Create account</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">มีบัญชีแล้ว? <Link href="/auth/login" className="font-bold text-cyan-300">เข้าสู่ระบบ</Link></p>
      </Card>
    </main>
  );
}
