#!/bin/bash

mongorestore --db $1 --drop $1.dump/$1