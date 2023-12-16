import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const allusers = await fetch(
          "https://backend-5ytl.onrender.com/getuser"
        );
        const data = await allusers.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const submitHandler = async () => {
    try {
      const userInfo = await fetch(
        "https://backend-5ytl.onrender.com/adduser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age }),
        }
      );

      const updatedAllUsers = await fetch(
        "https://backend-5ytl.onrender.com/getuser"
      );
      const updatedData = await updatedAllUsers.json();
      setUsers(updatedData);

      setAge("");
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user.name}</h2>
          <h2>{user.age}</h2>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={submitHandler}>Submit</button>
      </div>
    </>
  );
}

export default App;
