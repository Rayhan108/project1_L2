
import express, { Application } from 'express'
// import app from "./app";
import  confiq  from "./app/confiq";

import mongoose from 'mongoose';
const app :Application = express()
async function main() {
    
  try{
    await mongoose.connect(confiq.database_url as string);
    app.listen(confiq.port, () => {
      console.log(`Example app listening on port ${confiq.port}`)
    })
  }catch(err){
    console.log(err);
  }
  

  }
main()
