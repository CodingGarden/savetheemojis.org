#! /bin/bash

npm run styles
rm -r dist
mkdir dist
cp *.html dist/
cp -r styles/ dist/styles/
