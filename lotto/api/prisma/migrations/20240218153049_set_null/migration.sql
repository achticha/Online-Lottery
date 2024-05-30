/*
  Warnings:

  - Made the column `user` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "user" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
