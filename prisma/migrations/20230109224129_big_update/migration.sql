-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Furnitures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `specific` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `producerId` INTEGER NOT NULL,

    UNIQUE INDEX `Furnitures_specific_key`(`specific`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `about` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Producer_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Furnitures` ADD CONSTRAINT `Furnitures_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Furnitures` ADD CONSTRAINT `Furnitures_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
