"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function loginAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | never> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  let user;
  try {
    user = await prisma.adminUser.findUnique({ where: { email } });
  } catch {
    return { error: "Unable to connect to database. Check your DATABASE_URL." };
  }

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    name: user.name ?? undefined,
  });

  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  redirect("/admin/login");
}
