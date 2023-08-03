create database role_managements;
use role_managements;
select * from permissions;
insert into permissions(name) value 
	("create-role"), 
    ("update-role"),
    ("delete-role"),
    ("remove-role");
    
use marketplace;
create table new_project (
	id bigint auto_increment,
    name varchar(255) not null,
    image varchar(255) not null,
    introduction longtext,
    user_id bigint not null,
    approver_id bigint not null,
    status_id bigint not null,
    created_at datetime default current_timestamp,
    author varchar(255) not null,
    is_template boolean default 0,
    foreign key (user_id) references user_profile(id) ON DELETE CASCADE,
    foreign key (approver_id) references user_profile(id) ON DELETE CASCADE,
    foreign key (status_id) references status(id) ON DELETE CASCADE,
    primary key (id)
);

create table new_project_field (
	id bigint auto_increment primary key,
    field_id bigint not null,
    new_project_id bigint not null,
    foreign key (field_id) references field(id) ON DELETE CASCADE,
    foreign key (new_project_id) references new_project(id) ON DELETE CASCADE
);

create table fkey_value(
	id bigint primary key auto_increment,
    fkey varchar(255) not null,
    fvalue longtext,
    new_project_id bigint not null,
    foreign key (new_project_id) references new_project(id) ON DELETE CASCADE
);

drop table fkey_value;
drop table new_project;
drop table new_project_field;
delete from fkey_value;
delete from new_project;
alter table new_project add column status_id bigint not null;
alter table new_project add column introduction longtext;
alter table new_project add foreign key (status_id) references status(id);
alter table new_project modify column created_at datetime default current_timestamp not null;
alter table new_project drop column field_id;
alter table new_project add column image varchar(255) not null;
select * from user_profile;



select * from field;
select MAX(id) from field;
insert into field(id,name) values (6,"Tổng quát lĩnh vực");
insert into field(id,name) values (601,"Công nghệ");
insert into field(id,name) values (602,"Công nghệ thông tin");
insert into field(id,name) values (603,"Khoa học tự nhiên");
insert into field(id,name) values (604,"Môi trường");
insert into field(id,name) values (605,"Nông nghiệp");
insert into field(id,name) values (606,"Thủy sản");
insert into field(id,name) values (607,"Công nghệ thực phẩm");
insert into field(id,name) values (608,"Công nghệ sinh học");
insert into field(id,name) values (609,"Biến đổi khí hậu và phát triển Đồng Bằng Sông Cửu Long");
select * from user_profile;
select * from new_project;
select * from fkey_value;
select * from user_function;
select * from role;
select * from status;
update new_project set is_template = 1;
delete from new_project where id = 5;
select * from new_project_field;
delete from new_project;
delete from new_project_field;
delete from fkey_value;

select * from domain;
select * from role;
select * from user_function;
select * from password_reset_code;

select * from field;

alter table field modify column id bigint not null auto_increment;
alter table field drop foreign key FK1bynjb8iw58x2gt01gualp00p;
alter table field add constraint FK1bynjb8iw58x2gt01gualp00p foreign key (child_of_field_id) references field(id);
-- 1 
create table new_field(
	id bigint primary key auto_increment,
    name varchar(1000) not null,
    parent_id bigint,
    foreign key (parent_id) references new_field(id)
);

-- 2
drop table fkey_value;
drop table new_project;
drop table new_project_field;

-- 3
 create table new_project (
	id bigint auto_increment,
    name varchar(255) not null,
    image varchar(255) not null,
    introduction longtext,
    user_id bigint not null,
    approver_id bigint not null,
    status_id bigint not null,
    created_at datetime default current_timestamp,
    author varchar(255) not null,
    is_template boolean default 0,
    foreign key (user_id) references user_profile(id) ON DELETE CASCADE,
    foreign key (approver_id) references user_profile(id) ON DELETE CASCADE,
    foreign key (status_id) references status(id) ON DELETE CASCADE,
    primary key (id)
);

create table new_project_field (
	id bigint auto_increment primary key,
    field_id bigint not null,
    new_project_id bigint not null,
    foreign key (field_id) references new_field(id) ON DELETE CASCADE,
    foreign key (new_project_id) references new_project(id) ON DELETE CASCADE
);

create table fkey_value(
	id bigint primary key auto_increment,
    fkey varchar(255) not null,
    fvalue longtext,
    new_project_id bigint not null,
    foreign key (new_project_id) references new_project(id) ON DELETE CASCADE
);

insert into field(id, name) values (50901,'Công nghệ thực phẩm');
insert into field(id, name) values (50901,'Công nghệ thực phẩm');
insert into field(id, name) values (50901,'Công nghệ thực phẩm');
insert into field(id, name) values (50901,'Công nghệ thực phẩm');
insert into field(id, name) values (50901,'Công nghệ thực phẩm');

select MAX(id) from field;
-- 20/05/2023
-- Bug 1
use marketplace;

show columns from new_project;
alter table new_project modify column name longtext;
alter table new_project modify column image longtext;
alter table new_project modify column author longtext; 

-- Bug 2
use marketplace; 
show columns from password_reset_code;
alter table password_reset_code modify column expiry_date datetime(6) default null;
alter table password_reset_code modify column reset_code varchar(255) default null;


-- 29/05/2023 
-- New feature of 
use marketplace; 
create table new_footer(
	id bigint primary key auto_increment,
    name varchar(255) not null,
    domain_id bigint not null,
    foreign key (domain_id) references domain(id)
);
create table new_footer_info(
	id bigint primary key auto_increment,
    footer_key longtext not null,
    footer_value longtext,
    footer_id bigint not null,
    foreign key (footer_id) references new_footer(id)
);

create table introduction(
	id bigint primary key auto_increment,
    name varchar(255) not null,
    domain_id bigint not null,
    foreign key (domain_id) references domain(id)
);
create table introduction_info(
	id bigint primary key auto_increment,
    introduction_key longtext not null,
    introduction_value longtext,
    introduction_id bigint not null,
    foreign key (introduction_id) references introduction(id)
);

-- 1/6/2023
-- Find out the domain id
use marketplace;
select * from domain;
select * from introduction;
select * from introduction_info;
show tables;

select * from new_footer;
select * from new_footer_info;