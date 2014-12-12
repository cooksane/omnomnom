#!/bin/bash

TARGET_DIR=../../../www/final-col

rm -R $TARGET_DIR
mkdir $TARGET_DIR
cp -R static/* $TARGET_DIR