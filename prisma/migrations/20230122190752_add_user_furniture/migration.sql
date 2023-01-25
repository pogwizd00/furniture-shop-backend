/*
  Warnings:

  - You are about to drop the column `userId` on the `furnitures` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `furnitures` DROP FOREIGN KEY `Furnitures_userId_fkey`;

-- DropIndex
DROP INDEX `User_password_key` ON `user`;

-- AlterTable
ALTER TABLE `furnitures` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `UserFurniture` (
    `userId` INTEGER NOT NULL,
    `furnituresId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `furnituresId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFurniture` ADD CONSTRAINT `UserFurniture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFurniture` ADD CONSTRAINT `UserFurniture_furnituresId_fkey` FOREIGN KEY (`furnituresId`) REFERENCES `Furnitures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
