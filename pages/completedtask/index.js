import React, { useEffect } from 'react'
import { useRouter } from "next/router";

export default function Completed() {
  const router = useRouter();
  
  useEffect(() => {
    const { data } = router.query;
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      // You can use the parsedData in the Completed component
    }
  }, []);

  return (
    <div>
      <h1>Completed Task</h1>
    </div>
  );
}
