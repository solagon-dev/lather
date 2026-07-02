import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "team";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, and WebP images are allowed" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 10MB" }, { status: 400 });
    }

    // Generate clean filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .substring(0, 60);
    const timestamp = Date.now();
    const filename = `${safeName}-${timestamp}.${ext}`;

    // Ensure directory exists
    const dir = path.join(process.cwd(), "public", "media", folder);
    await mkdir(dir, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(dir, filename);
    await writeFile(filePath, buffer);

    const publicPath = `/media/${folder}/${filename}`;

    return NextResponse.json({ url: publicPath });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
