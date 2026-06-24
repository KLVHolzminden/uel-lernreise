import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const DEV_ACCESS_CODE_HASH =
  "af3fb2e763d2c56133a764bea4bc0b2af9b0e2d9fbb20b63a8e237afad836f63";

function getConfiguredHashes() {
  return (process.env.ACCESS_CODE_HASHES || DEV_ACCESS_CODE_HASH)
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function sha256(value: string) {
  return createHash("sha256").update(value.trim(), "utf8").digest("hex");
}

function safeHashEquals(inputHash: string, configuredHash: string) {
  if (!/^[a-f0-9]{64}$/i.test(configuredHash)) return false;

  const inputBuffer = Buffer.from(inputHash, "hex");
  const configuredBuffer = Buffer.from(configuredHash, "hex");

  return inputBuffer.length === configuredBuffer.length && timingSafeEqual(inputBuffer, configuredBuffer);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code : "";

  if (!code.trim()) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const inputHash = sha256(code);
  const valid = getConfiguredHashes().some((configuredHash) => safeHashEquals(inputHash, configuredHash));

  return NextResponse.json({ valid });
}
