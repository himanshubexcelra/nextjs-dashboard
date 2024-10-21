import { db } from "./db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { ActionResult } from "next/dist/server/app-render/types";

export async function signup(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  "use server";
  try {
    const username = formData.get("username");
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return {
        error: "Invalid username",
      };
    }

    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
      return {
        error: "Invalid password",
      };
    }

    // Check if the username already exists
    let existingUser;
    try {
      existingUser = await db.query(`SELECT id FROM auth_user WHERE username = $1`, [username]);
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return { error: "Database query failed" };
    }

    if (existingUser.rows.length > 0) {
      return {
        error: "Username already exists",
      };
    }

    // Hash the password
    let passwordHash;
    try {
      passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
    } catch (hashError) {
      console.error("Password hashing error:", hashError);
      return { error: "Password hashing failed" };
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    // Insert user into the database
    try {
      await db.query(`INSERT INTO auth_user (id, username, password_hash) VALUES ($1, $2, $3)`, [
        userId,
        username,
        passwordHash,
      ]);
    } catch (insertError) {
      console.error("Database insert error:", insertError);
      return { error: "Failed to insert user" };
    }

    // Create a new session
    let session, sessionCookie;
    try {
      session = await lucia.createSession(userId, {});
      sessionCookie = lucia.createSessionCookie(session.id);
    } catch (sessionError) {
      console.error("Session creation error:", sessionError);
      return { error: "Session creation failed" };
    }

    // Set the session cookie
    try {
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (cookieError) {
      console.error("Cookie setting error:", cookieError);
      return { error: "Failed to set session cookie" };
    }

    return redirect("/login");
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return {
      error: "Something went wrong during signup",
    };
  }
}
