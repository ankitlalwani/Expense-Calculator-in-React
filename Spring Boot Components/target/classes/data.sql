Alter TABLE user ADD CONSTRAINT username_unq UNIQUE (username);

insert into user values ('ankitlalwani', 'Arpitl@2710','ankitlalwani30@gmail.com');
insert into user values ( 'anuadwani', 'Arpitl@2710', 'anubhaad27@gmail.com' );
insert into user values ( 'arpitl', 'Arpitl@2710', 'ankitlalwani.inbox@gmail.com' );

insert into category values ( 1, 'Travel' );
insert into category values ( 2, 'Home' );
insert into category values ( 3, 'Chores' );
insert into category values ( 4, 'Rent' );

insert into expense values ( 1,'Home Movement',  100.00, '2020-08-04T17:00:00.000Z', 'Charlotte',  1, 'ankitlalwani' );
insert into expense values ( 2, 'Cali n Titos', 200.00,'2020-08-04T16:00:00.000Z', 'Athens', 2 , 'anuadwani');
insert into expense values ( 3, 'Patel Brothers', 200.00,'2020-08-05T16:00:00.000Z', 'Atlanta', 3 , 'anuadwani');
insert into expense values ( 4, 'Honest Restaurant', 200.00,'2020-08-03T16:00:00.000Z', 'Atlanta', 3 , 'anuadwani');
insert into expense values ( 5,'Kroger',  79.00, '2020-08-04T17:00:00.000Z', 'Charlotte',  3, 'ankitlalwani' );
insert into expense values ( 6,'Kroger1',  23.00, '2020-08-04T17:00:00.000Z', 'Charlotte',  3, 'ankitlalwani' );