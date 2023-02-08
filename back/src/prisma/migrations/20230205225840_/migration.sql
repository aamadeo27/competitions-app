-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- CreateTable
CREATE TABLE "Challenge" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "challenger" STRING NOT NULL,
    "challenged" STRING NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "status" "ChallengeStatus" NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);
