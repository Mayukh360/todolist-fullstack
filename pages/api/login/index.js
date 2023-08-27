import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("LOGIN", data);

    const client = await MongoClient.connect(
      "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find the user with the provided email
    const user = await usersCollection.findOne({ email: data.email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(data.password, user.password);

      if (passwordMatch) {
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, "abcdxyztrsdgpjslyytfdcbf");

        res.status(200).json({ message: "Logged in", token, userId: user._id });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }

    client.close();
  }
}
