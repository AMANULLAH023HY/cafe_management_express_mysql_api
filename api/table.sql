
-- create user table 
create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(250),
    email varchar(250),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
    
);

-- insert data from user table 

insert into user(name,contactNumber,email,password,status,role)values("Amin",'1234567890',"admin@gmail.com","123456", 'true',"admin");


-- create category table 
create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    primary key(id)
);

-- create product table 
create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

-- Create Bill table 
create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(250) NOT NULL,
    primary key (id),

);


