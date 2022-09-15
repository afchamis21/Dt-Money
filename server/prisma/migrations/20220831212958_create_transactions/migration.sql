-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");
