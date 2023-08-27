import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("SIGNUP", data);

    const client = await MongoClient.connect(
      "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
    );

    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if the provided email already exists in the database
    const existingUser = await usersCollection.findOne({ email: data.email });

    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      client.close();
      return;
    }

    if (data.password) {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Store the hashed password in the database along with other user data
      const user = {
        name: data.name,
        email: data.email,
        password: hashedPassword
      };

      // Insert the user into the database
      const result = await usersCollection.insertOne(user);

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: result.insertedId }, "abcdxyztrsdgpjslyytfdcbf");

      res.status(201).json({ message: "User created", token, userId: result.insertedId });
    } 

    client.close();
  }
}
