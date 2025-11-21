-- CreateTable
CREATE TABLE "MarqueeEntry" (
    "member" TEXT NOT NULL,
    "project" TEXT NOT NULL,

    CONSTRAINT "MarqueeEntry_pkey" PRIMARY KEY ("member")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarqueeEntry_member_key" ON "MarqueeEntry"("member");
