import React from 'react'
import imgg from './banner-icon.png'
import courseimg from './a.jpeg'
import './Home.css'
const Home = () => {
  const data = [
    { id: 1, name: 'Alice', score: 2500, avatar: 'https://i.pravatar.cc/50?img=1' },
    { id: 2, name: 'Bob', score: 2300, avatar: 'https://i.pravatar.cc/50?img=2' },
    { id: 3, name: 'Charlie', score: 2200, avatar: 'https://i.pravatar.cc/50?img=3' },
    { id: 4, name: 'Dave', score: 2100, avatar: 'https://i.pravatar.cc/50?img=4' },
    { id: 5, name: 'Eve', score: 2000, avatar: 'https://i.pravatar.cc/50?img=5' }
  ];
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

  const firstname='Varsha';

  const currentDate = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const Card=()=>{
    return(
      <div className="card">
        <div className='img'>
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
    )
  }

  return (
    <div className='home'>
      <div className="banner">
        <div className="banner-left">
          <div>{formattedDate}</div>
          <div>
            <h1>Welcome back, {firstname}!</h1>
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
            <button className='btn'>See all</button>
          </div>
          <div className="courses">
            <Card/>
            <Card/> 
            <Card/> 
          </div>    
        </div>
        <div className="right">
          <Leaderboard data={data} />
        </div>
      </div>
    </div>
  )
}

export default Home