#!/bin/bash

verboseExec() {
  echo $@
  $@
}

verboseExec rm -rf ../back/public/*
verboseExec cp -rf ./build/* ../back/public/