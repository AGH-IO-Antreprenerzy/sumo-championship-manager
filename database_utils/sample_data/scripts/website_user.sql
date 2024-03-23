LOAD DATA INFILE 'database_utils/sample_data/data/website_user.csv'
into table website_user
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows;