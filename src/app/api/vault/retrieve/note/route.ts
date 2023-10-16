import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtDecrypt } from "jose";
import { DecodeHex } from "@libs/enc-dec-lib";
import { DecryptAES } from "@libs/crypto-lib";

export async function GET(nextRequest: NextRequest) {
  try {
    const encryptedJwt = nextRequest.cookies.get("encryptedjwt")?.value;
    const vaultRetrieveNoteData = nextRequest.nextUrl.searchParams.get("note");

    if (encryptedJwt !== undefined && vaultRetrieveNoteData !== null) {
      const prisma = new PrismaClient();

      const { payload, protectedHeader } = await jwtDecrypt(encryptedJwt, DecodeHex(process.env.SECRET_KEY!), {
        issuer: "https://satupassword.com",
        audience: "https://satupassword.com",
      });

      return NextResponse.json({ message: "Successful!", note: DecryptAES(vaultRetrieveNoteData, payload.masterKey as string) }, { status: 200 });
    }
    return NextResponse.json({ message: "Something went wrong!" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
