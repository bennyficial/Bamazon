create database bamazon_DB;
use bamazon_DB;

create table products (
	item_id integer not null auto_increment,
	product_name varchar(50) not null,
    department_name varchar(50) not null,
    price integer default 0,
    stock_quantity integer default 0,
    product_sales integer default 0,
    primary key (item_id)
 );


create table departments (
	department_id integer not null auto_increment,
    department_name varchar(50) not null,
    over_head_costs integer default 0,
    primary key (department_id)
);

