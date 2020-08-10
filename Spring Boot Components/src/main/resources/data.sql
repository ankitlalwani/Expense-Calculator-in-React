Alter TABLE user ADD CONSTRAINT username_unq UNIQUE (username);

insert into user values ('ankitlalwani', 'Arpitl@2710','ankitlalwani30@gmail.com');
insert into user values ( 'anuadwani', 'Arpitl@2710', 'anubhaad27@gmail.com' );
insert into user values ( 'arpitl', 'Arpitl@2710', 'ankitlalwani.inbox@gmail.com' );

insert into category values ( 101, 'Travel' );
insert into category values ( 102, 'Home' );
insert into category values ( 103, 'Chores' );
insert into category values ( 104, 'Rent' );

insert into expense values ( 1001,'Home Movement',  '100.00', '2020-08-04T17:00:00.000Z', 'Charlotte',  101, 'ankitlalwani' );
insert into expense values ( 1002, 'Cali n Titos', '200.00','2020-08-04T16:00:00.000Z', 'Athens', 102 , 'anuadwani');
insert into expense values ( 1003, 'Patel Brothers', '200.00','2020-08-05T16:00:00.000Z', 'Atlanta', 103 , 'anuadwani');
insert into expense values ( 1004, 'Honest Restaurant', '200.00','2020-08-03T16:00:00.000Z', 'Atlanta', 103 , 'anuadwani');
insert into expense values ( 1005,'Kroger',  '79.00', '2020-08-04T17:00:00.000Z', 'Charlotte',  103, 'ankitlalwani' );