import express from 'express'

const recordRoutes = express.Router();

import express from 'express'

import { db_connect } from '../db/conn.js';
  
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
      .collection("records")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });