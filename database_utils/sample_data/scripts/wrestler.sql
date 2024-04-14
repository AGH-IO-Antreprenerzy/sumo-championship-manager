LOAD DATA INFILE 'database_utils/sample_data/data/wrestler.csv'
into table wrestler
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows;