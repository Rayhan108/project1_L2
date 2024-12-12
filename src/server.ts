
import { Server } from 'http';
import app from "./app";
import  confiq  from "./app/confiq";

import mongoose from 'mongoose';
let server : Server;
async function main() {
    
  try{
    await mongoose.connect(confiq.database_url as string);
    server = app.listen(confiq.port, () => {
      console.log(`Example app listening on port ${confiq.port}`)
    })
  }catch(err){
    console.log(err);
  }
  

  }
main()
process.on('unhandledRejection',()=>{
  console.log(`😡ungandledRejection occurs.shutting down...`);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1);
})
process.on('uncaughtException',()=>{
  console.log(`😡uncaughtException is detected.shutting down...`);
process.exit(1)
})