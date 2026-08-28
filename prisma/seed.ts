import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";
const prisma = new PrismaClient();

const admin = "admin";
const password = "admin"; //you can change password here

async function main() {
  await prisma.user.create({
    data: {
      username: admin,
      password: createHmac("sha256", process.env.HMAC_SALT!.toString())
        .update(password)
        .digest("base64"),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
