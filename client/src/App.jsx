import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [student_name, setStudent_name] = useState("");
  const [college_name, setCollege_name] = useState("");
  const [r1_marks, setR1_marks] = useState(0);
  const [r2_marks, setR2_marks] = useState(0);
  const [r3_marks, setR3_marks] = useState(0);
  const [tech_marks, setTech_marks] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    let total_marks = +r1_marks + +r2_marks + +r3_marks + +tech_marks;
    let result = total_marks >= 35 ? "Selected" : "Rejected";

    Axios.post("http://localhost:3001/createUser", {
      student_name,
      college_name,
      r1_marks,
      r2_marks,
      r3_marks,
      tech_marks,
      total_marks,
      result,
      rank: 0, // Default rank is 0, will update later
    })
      .then((response) => {
        setListOfUsers((prevList) => {
          const newUser = response.data;
          const updatedList = [...prevList, newUser];
          return sortAndRankUsers(updatedList);
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("Error: No response from server.");
        } else {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
      });
  };

  // Function to sort users and assign ranks
  const sortAndRankUsers = (users) => {
    const sortedUsers = [...users].sort(
      (a, b) => b.total_marks - a.total_marks
    );

    let currentRank = 1;
    let previousMarks = null;
    return sortedUsers.map((user, index) => {
      if (previousMarks === null || user.total_marks < previousMarks) {
        // Assign a new rank if the marks are different from the previous user
        previousMarks = user.total_marks;
      } else {
        // Keep the same rank if the marks are the same
        currentRank--;
      }

      const rankedUser = {
        ...user,
        rank: currentRank,
      };

      currentRank++;
      return rankedUser;
    });
  };

  // Sorting and ranking users when listOfUsers changes
  const sortedAndRankedUsers = sortAndRankUsers(listOfUsers);

  const getResultClass = (result) => {
    return result === "Selected" ? "result-selected" : "result-rejected";
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Add New User</h2>
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            id="studentName"
            className="input-field"
            type="text"
            placeholder="Student Name..."
            onChange={(event) => {
              setStudent_name(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="collegeName">College Name:</label>
          <input
            id="collegeName"
            className="input-field"
            type="text"
            placeholder="College Name..."
            onChange={(event) => {
              setCollege_name(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="r1Marks">R1 Marks:</label>
          <input
            id="r1Marks"
            className="input-field"
            type="number"
            placeholder="R1 Marks..."
            onChange={(event) => {
              setR1_marks(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="r2Marks">R2 Marks:</label>
          <input
            id="r2Marks"
            className="input-field"
            type="number"
            placeholder="R2 Marks..."
            onChange={(event) => {
              setR2_marks(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="r3Marks">R3 Marks:</label>
          <input
            id="r3Marks"
            className="input-field"
            type="number"
            placeholder="R3 Marks..."
            onChange={(event) => {
              setR3_marks(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="techMarks">Tech Marks:</label>
          <input
            id="techMarks"
            className="input-field"
            type="number"
            placeholder="Tech Marks..."
            onChange={(event) => {
              setTech_marks(event.target.value);
            }}
          />
        </div>
        <button className="submit-button" onClick={createUser}>
          Create User
        </button>
      </div>

      <div className="table-container">
        <h1>Student Marks Table</h1>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>College Name</th>
              <th>R1 Marks</th>
              <th>R2 Marks</th>
              <th>R3 Marks</th>
              <th>Tech Marks</th>
              <th>Total Marks</th>
              <th>Result</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndRankedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.student_name}</td>
                <td>{user.college_name}</td>
                <td>{user.r1_marks}</td>
                <td>{user.r2_marks}</td>
                <td>{user.r3_marks}</td>
                <td>{user.tech_marks}</td>
                <td>{user.total_marks}</td>
                <td className={getResultClass(user.result)}>{user.result}</td>
                <td>{user.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
