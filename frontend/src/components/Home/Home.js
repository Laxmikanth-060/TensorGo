import React, { useEffect, useState,useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import imgg from "./banner-icon.png";
import courseimg from "./a.jpeg";
import "./Home.css";
import { UserContext } from "../../context/UserContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: inputValue, done: false }]);
      setInputValue("");
    }
  };

  const toggleTaskDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Add Task
        </button>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={`todo-item ${task.done ? "done" : ""}`}>
            <span onClick={() => toggleTaskDone(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="todo-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Leaderboard = ({ data }) => {
  // Sort the data by score in descending order
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {sortedData.map((user, index) => (
          <li key={user.id} className="leaderboard-item">
            <div className="rank">{index + 1}</div>
            <div className="avatar">
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            </div>
            <div className="name">{user.name}</div>
            <div className="score">{user.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Card = () => {
  return (
    <div className="card">
      <div className="img">
        <img src={courseimg} alt="" />
      </div>
      <div className="content">
        <div className="heading">Learn Ui Ux with ZHF Design Studio</div>
        <div className="struct">
          <div className="tut">
            <div>35 Tutorials</div>
            <div>3hr/Daily</div>
          </div>
          <div className="pie">65%</div>
        </div>
        <div className="nextclass">Next Class Starts in 30min</div>
      </div>
    </div>
  );
};

const Home = () => {
  const data = [
    {
      id: 1,
      name: "Munnu",
      score: 2500,
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      id: 2,
      name: "Swapnith",
      score: 2300,
      avatar: "https://i.pravatar.cc/50?img=2",
    },
    {
      id: 3,
      name: "Ajay",
      score: 2200,
      avatar: "https://i.pravatar.cc/50?img=3",
    },
    {
      id: 4,
      name: "Chandu",
      score: 2100,
      avatar: "https://i.pravatar.cc/50?img=4",
    },
    {
      id: 5,
      name: "Kummu",
      score: 2000,
      avatar: "https://i.pravatar.cc/50?img=5",
    },
    {
      id: 6,
      name: "Gummu",
      score: 2400,
      avatar: "https://i.pravatar.cc/50?img=7",
    },
  ];

  const { user } = useContext(UserContext);

  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const useTimeTracker = () => {
    const [timeSpent, setTimeSpent] = useState(() => {
      const savedTime = localStorage.getItem("timeSpent");
      return savedTime ? parseInt(savedTime, 10) : 0;
    });
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const endTime = new Date();
          setTimeSpent((prev) => {
            const updatedTime = prev + (endTime - startTime);
            localStorage.setItem("timeSpent", updatedTime);
            return updatedTime;
          });
        } else {
          setStartTime(new Date());
        }
      };

      setStartTime(new Date());
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        const endTime = new Date();
        setTimeSpent((prev) => {
          const updatedTime = prev + (endTime - startTime);
          localStorage.setItem("timeSpent", updatedTime);
          return updatedTime;
        });
      };
    }, [startTime]);

    return timeSpent;
  };

  const timeSpent = useTimeTracker();

  const studyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Studied",
        data: [2, 4, 3, 5, 6, 2, 3], // Mock data, replace with actual time spent
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="home">
      <div className="banner">
        <div className="banner-left">
          <div>{formattedDate}</div>
          <div>
            {user? <h1>Welcome back, {user.username}!</h1> : <h1>Welcome back!</h1>}
            <p>Always stay updated in your study portal</p>
          </div>
        </div>
        <div className="banner-right">
          <img src={imgg} alt="" />
        </div>
      </div>

      <div className="bottom">
        <div className="course-div">
          <div className="head">
            <p>Active Courses</p>
            <button className="btn">See all</button>
          </div>
          <div className="courses">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="right">
          <Leaderboard data={data} />
        </div>
      </div>

      <div className="bottom-2">
        <div className="study-time-chart">
          <h2>Weekly Study Trends</h2>
          <Line data={studyData} />
          <p>Total Time Spent: {(timeSpent / 1000 / 60).toFixed(2)} minutes</p>
        </div>
        {/* <div className='todo-container'> */}
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
