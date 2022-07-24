import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
async function main() {
  await db.user.create({
    data: {
      id: "cl5z594j300961h5clvm1c1jk",
      name: "Ludovico Russo",
      image:
        "https://lh3.googleusercontent.com/a/AItbvmlT1u_EDU9bEP4XpVfVYOKuToyy3mTR9wdwDW03=s96-c",
    },
  });
  await db.account.create({
    data: {
      id: "cl5z594ji01031h5co1s8p5cf",
      userId: "cl5z594j300961h5clvm1c1jk",
      provider: "google",
      type: "oauth",
      providerAccountId: "107829519248333049239",
    },
  });
  await db.author.create({
    data: {
      bio: "",
      name: "Ludovico Russo",
      profileImage:
        "https://lh3.googleusercontent.com/a/AItbvmlT1u_EDU9bEP4XpVfVYOKuToyy3mTR9wdwDW03=s96-c",
      user: {
        connect: {
          id: "cl5z594j300961h5clvm1c1jk",
        },
      },
    },
  });
}

main();
