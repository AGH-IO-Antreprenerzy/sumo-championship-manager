LOAD DATA INFILE 'database_utils/sample_data/data/owned_clubs.csv'
into table owned_clubs
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows;