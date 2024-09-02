import mongoose from "mongoose";

export  const connection = () => {
        mongoose.connect(process.env.MONGO_URL , {
            dbName : "TokenGateWayDB"
        }).then(() => {
            console.log("DATABASE CONNECTED!");
        }).catch((err) => {
            console.log("SOME ERROR OCCURED!")
            console.log(err);
        })
    }
