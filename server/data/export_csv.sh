#!/bin/bash

mongoexport --db $1 --collection logs --csv --fieldFile logs_fields.txt --out $1_logs.csv
mongoexport --db $1 --collection nasas --csv --fieldFile nasas_fields.txt --out $1_nasas.csv
mongoexport --db $1 --collection surveys --csv --fieldFile surveys_fields.txt --out $1_surveys.csv
mongoexport --db $1 --collection logs_computed --csv --fieldFile logs_computed_fields.txt --out $1_logs_computed.csv
