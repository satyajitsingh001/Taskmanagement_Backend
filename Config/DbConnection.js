import mongoose from "mongoose";

const DbConnection = () => {
  mongoose
    .connect(process.env.DB_CONNETION_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`♻️  database connected to: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log("database connetion faild", error);
    });
};

export default DbConnection;
