import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("todolist");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Request successful" });
  } else if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("todolist");
      const result = await meetupsCollection.find().toArray();

      client.close();
      res.status(200).json(result);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, data } = req.body;
      console.log("PUT", data, id);

      const client = await MongoClient.connect(
        "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("todolist");
      const result = await meetupsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { todo: data.todo, isCompleted: data.isCompleted } }
      );
      client.close();

      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      console.log("DELETE", id);

      const client = await MongoClient.connect(
        "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("todolist");
      const result = await meetupsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      client.close();

      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Delete successful" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
