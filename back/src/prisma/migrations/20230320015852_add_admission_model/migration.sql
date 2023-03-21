-- CreateEnum
CREATE TYPE "AdmissionStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Admission" (
    "competition_id" INT8 NOT NULL,
    "steamId" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" "AdmissionStatus" NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("competition_id","steamId")
);
