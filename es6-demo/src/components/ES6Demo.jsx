import React from "react";

// Class Component
class Welcome extends React.Component {
  render() {
    return <h2>Welcome, {this.props.name}!</h2>;
  }
}

// Function Component với Arrow Function
const ES6Demo = () => {
  // Variables (let, const, var)
  const name = "Austin"; // const: giá trị cố định
  let age = 21; // let: có thể thay đổi
  var oldSyntax = "var vẫn hoạt động, nhưng nên tránh dùng.";

  age = 22;

  // Array + map()
  const items = ["Apple", "Banana", "Grape"];

  // Destructuring
  const user = { username: "Austin", country: "Vietnam", role: "Admin" };
  const { username, country } = user;

  // Spread Operator (copy + thêm thuộc tính)
  const user2 = { ...user, role: "User", age: 22 };

  // Ternary Operator
  const isAdmin = user.role === "Admin";

  // Arrow Function trong nội bộ component
  const greet = (name) => `Xin chào, ${name}!`;

  return (
    <div style={{ fontFamily: "Arial", margin: "2rem" }}>
      <h1>React ES6 Demo</h1>

      {/* Class Component */}
      <Welcome name={name} />

      {/* Arrow Function */}
      <p>{greet(name)}</p>

      {/* Variables */}
      <p>
        Tuổi: {age} — {oldSyntax}
      </p>

      {/* Array + map() */}
      <h3>Danh sách trái cây:</h3>
      <ul>
        {items.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      {/* Destructuring */}
      <h3>Thông tin user (Destructuring):</h3>
      <p>
        Tên: {username} — Quốc gia: {country}
      </p>

      {/* Spread Operator */}
      <h3>Copy user với Spread Operator:</h3>
      <pre>{JSON.stringify(user2, null, 2)}</pre>

      {/* Ternary Operator */}
      <h3>Phân quyền:</h3>
      <p>{isAdmin ? "Là Admin" : "Không phải Admin"}</p>
    </div>
  );
};

export default ES6Demo;
