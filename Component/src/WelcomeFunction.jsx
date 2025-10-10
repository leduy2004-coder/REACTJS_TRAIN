import React, { useState, useEffect } from "react";

function WelcomeFunction() {
  const [count, setCount] = useState(0);

  // Mount
  useEffect(() => {
    console.log("useEffect (Mount): Chạy khi component render lần đầu");
    return () => {
      console.log("useEffect Cleanup (Unmount): Component bị xóa");
    };
  }, []);

  // Update
  useEffect(() => {
    console.log("useEffect (Update): count thay đổi");
  }, [count]);

  console.log("Render: Hiển thị UI");

  return (
    <div style={{ border: "1px solid green", padding: "10px" }}>
      <h2>Function Component</h2>
      <p>Giá trị đếm: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}

export default WelcomeFunction;
