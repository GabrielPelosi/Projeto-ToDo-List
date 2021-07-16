create sequence hibernate_sequence start 1 increment 1
create table tb_task (id int8 not null, created_by bytea, created_date_time timestamp, last_updated_by bytea, last_updated_date_time timestamp, description varchar(255) not null, title varchar(255) not null, primary key (id))
create table tb_user (id int8 not null, email varchar(255) not null, enabled boolean not null, first_name varchar(255) not null, last_name varchar(255) not null, password varchar(255) not null, verification_code varchar(64), primary key (id))
create table user_roles (user_id int8 not null, user_role int4)
alter table if exists tb_user add constraint UK_4vih17mube9j7cqyjlfbcrk4m unique (email)
alter table if exists user_roles add constraint FKlqb868dhpatxi3e1m1nu3ukr5 foreign key (user_id) references tb_user
