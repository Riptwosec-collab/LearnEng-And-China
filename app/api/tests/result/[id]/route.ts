import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return NextResponse.json({
    data: {
      id,
      status: "client_result",
      messageTh: "Phase 1 ยังไม่ persist result ลง database ให้ใช้ผลลัพธ์จาก POST /api/tests/submit ก่อน และ Phase ถัดไปจะเชื่อม Prisma/Supabase"
    }
  });
}
