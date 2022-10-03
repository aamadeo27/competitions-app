#!/bin/bash

echo 'Replacing Front assets in Back'

verboseExec() {
  echo $@
  $@
}

verboseExec rm -rf ../back/public/*
verboseExec cp -rf ./build/* ../back/public/