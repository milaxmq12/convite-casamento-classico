CREATE TABLE `rsvps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`attendance` enum('yes','no') NOT NULL,
	`guests` int NOT NULL DEFAULT 1,
	`dietary` text,
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rsvps_id` PRIMARY KEY(`id`)
);
