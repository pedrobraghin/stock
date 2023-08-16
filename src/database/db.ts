import { Sequelize } from "sequelize";

const db_name = process.env.DB_NAME as string;
const db_user = process.env.DB_USER as string;
const db_password = process.env.DB_PASSWORD;

export const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});

export async function connection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
  } catch (err: any) {
    console.log("Unable to connect to database" + err.message);
  }
}
