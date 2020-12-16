const express = require("express");
const mysql = require("mysql");

const db = () => {
  return mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "dwdpro"
    },
    console.log("connect database success")
  );
};

module.exports = db;
