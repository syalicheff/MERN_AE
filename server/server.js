import { db_connect } from './db/conn.js';
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'


//read .ods file and get a json object from it


(async  () => {
    const con = await db_connect()
    // console.log(con)
})();