#!/bin/bash

TARGET_DIR=../../../www/final

rm -R $TARGET_DIR
mkdir $TARGET_DIR
cp -R static/* $TARGET_DIR