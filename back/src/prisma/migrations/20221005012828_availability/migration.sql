-- CreateTable
CREATE TABLE "TimeFrame" (
    "userId" STRING NOT NULL,
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "description" STRING,
    "days" STRING NOT NULL,
    "start" INT4 NOT NULL,
    "end" INT4 NOT NULL,
    "canPlay" BOOL NOT NULL,
    "validSince" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),

    CONSTRAINT "TimeFrame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeFrame" ADD CONSTRAINT "TimeFrame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("steamId") ON DELETE RESTRICT ON UPDATE CASCADE;
