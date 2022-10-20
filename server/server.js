import { db_connect } from './db/conn.js';
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'



(async  () => {
    const con = await db_connect()
    // console.log(con)
})();