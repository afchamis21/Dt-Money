/*
  Warnings:

  - You are about to alter the column `price` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_Transactions" ("category", "createdAt", "description", "id", "price", "type") SELECT "category", "createdAt", "description", "id", "price", "type" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
