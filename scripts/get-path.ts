import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = await prisma.post.findMany({
    select: {
      path: true,
    },
  });
  for (const p of res) {
    if (!testRegex(p.path || "")) {
      console.log(p.path);
    }
  }
}

const regs = [
  /\/blog\/[0-9]+\/[0-9]+\/[^\s]+\//,
  /\/hotthisweek\/[^\s]+\//,
  /\/pharmaquotes\/[^\s]+\//,
  /\/pharmacronimi\/[^\s]+\//,
  /\/farmahistory\/[^\s]+\//,
];

function testRegex(p: string) {
  for (const r of regs) {
    if (r.test(p)) {
      return true;
    }
  }
  return false;
}

main();
