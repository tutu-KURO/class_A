DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`(
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,-- カラムの追加
  UNIQUE KEY `uk_email`(`email`)
);

