
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const userId = data.userId; 
    console.log(data);
    
   
    
    const client = await MongoClient.connect(
      "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("todolist");
    
    
    const taskData = {
      ...data,
      userId: userId,
    };
    
    const result = await meetupsCollection.insertOne(taskData);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Request successful" });
  }else   if (req.method === "GET") {
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
  }
 else  if (req.method === "PUT") {
    const { id, data } = req.body;
    console.log("DATA", id, data);

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://mkc360:m.c.605551@cluster0.mxwuzmm.mongodb.net/todolist?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("todolist");

      const objectId = new ObjectId(id); // Convert the id string to ObjectId


      const result = await meetupsCollection.updateOne(
        { _id: objectId }, // Find the document by its ObjectId
        { $set: { isCompleted: data.isCompleted } } // Update the isCompleted field with the new value
      );

      client.close();

      if (result.matchedCount === 0) {
       
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  }   else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
