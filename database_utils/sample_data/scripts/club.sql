LOAD DATA INFILE 'database_utils/sample_data/data/club.csv'
into table club
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows;