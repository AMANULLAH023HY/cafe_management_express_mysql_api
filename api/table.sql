
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


