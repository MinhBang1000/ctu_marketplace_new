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
    field_id bigint not null,
    user_id bigint not null,
    approver_id bigint not null,
    status_id bigint not null,
    created_at datetime default current_timestamp,
    author varchar(255) not null,
    is_template boolean default 0,
    is_active boolean default 0,
    foreign key (field_id) references field(id),
    foreign key (user_id) references user_profile(id),
    foreign key (approver_id) references user_profile(id),
    foreign key (status_id) references status(id),
    primary key (id)
);

delete from fkey_value;
delete from new_project;
alter table new_project add column status_id bigint not null;
alter table new_project add foreign key (status_id) references status(id);
alter table new_project modify column created_at datetime default current_timestamp not null;

create table fkey_value(
	id bigint primary key auto_increment,
    fkey varchar(255) not null,
    fvalue longtext,
    new_project_id bigint not null,
    foreign key (new_project_id) references new_project(id)
);

select * from field;
select MAX(id) from field;
insert into field(id,name) values (50900,"Mẫu");
select * from user_profile;
select * from new_project;
select * from fkey_value;
select * from user_function;
select * from role;
select * from status;

