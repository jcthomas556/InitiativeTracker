
create table images(image_id SERIAL primary key, player_character BOOL, img_description text, img bytea);


create table player_characters(player_id SERIAL primary key, player_fname varchar(50) NOT NULL,
player_lname varchar(50), player_ac int NOT NULL, player_Init_Bonus int NOT NULL, player_race varchar(50),
player_class varchar(50), image_id int references images(image_id));

create table npc_characters(npc_id SERIAL primary key, npc_fname varchar(50) NOT NULL,
npc_lname varchar(50), npc_ac int NOT NULL, npc_Init_Bonus int NOT NULL, npc_race_type varchar(50),
enemy BOOl, image_id int references images(image_id));
