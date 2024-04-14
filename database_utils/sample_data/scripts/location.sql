LOAD DATA INFILE 'database_utils/sample_data/data/location.csv'
into table location
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows;