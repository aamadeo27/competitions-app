-- CreateTable
CREATE TABLE "User" (
    "steamId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "avatar" STRING NOT NULL,
    "competitionId" INT8,
    "discordId" STRING,
    "twitchId" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("steamId")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" STRING NOT NULL,
    "token" STRING NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "shortname" STRING NOT NULL,
    "start" TIMESTAMP(3),

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionMatch" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "competitionId" INT8 NOT NULL,
    "phase" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "competitor1" STRING NOT NULL,
    "competitor2" STRING NOT NULL,
    "rounds" INT4 NOT NULL DEFAULT 3,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "CompetitionMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundResult" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "matchId" INT8 NOT NULL,
    "order" INT4 NOT NULL,
    "winner" STRING NOT NULL,
    "details" STRING NOT NULL,

    CONSTRAINT "RoundResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_steamId_key" ON "User"("steamId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_competitionId_key" ON "User"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitchId_key" ON "User"("twitchId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_name_key" ON "Competition"("name");
