import React,{useState,useEffect} from 'react';
import './CoursePage.css';
import getCourseById from '../../utils/getCourseById';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Loader from '../shared/Loader';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOndemandVideo, MdOutlineVideoLibrary } from "react-icons/md";
import { FaStar } from 'react-icons/fa';

const CoursePage = () => {
  const { courseId } = useParams(); 
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [coverImage,setCoverImage] = useState('')
  const [courseData, setCourseData] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [modules, setModules] = useState([]);
  const [price,setPrice] = useState('');
  const [rating,setRating] = useState(0);
  const [activeModule, setActiveModule] = useState(null);


  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getCourseById(courseId);
      if (courseData) {
        console.log(courseData);
        setCourseData(courseData);
        setModules(courseData.modules);
        setPrice(courseData.pricingInfo.price);
        setTitle(courseData.title);
        setDescription(courseData.description);
        setCoverImage(courseData.coverImage);
        setRating(courseData.rating);
        setCurrentVideo(courseData.modules[0].videosList[0].videoUrl);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const toggleModule = (idx) => {
    setActiveModule(activeModule === idx ? null : idx); 
  };


  if(courseData.length === 0){
    return(
      <div>
        <Loader/>
      </div>
    )
  }

  return (
    <div className="course-page">
        <div className="course-banner">
          <img
            src={coverImage}
            alt="course-banner"
          />
        </div>
      <div className='course-bottom-container'>
      <div className="course-header">
        <div className="course-info">
          <h1>{title}</h1>
          <p >Instructor: Abhilash Sandupatla</p>
          <div className="rating">
          <span>Rating: </span>
            {[...Array(Math.floor(rating))].map((_, i) => (
              <span key={i} className='rating-star'><FaStar/></span>
            ))} 
            {rating % 1 !== 0 && <span className='rating-star'><FaStar/></span>} 
            {rating}/5 
          </div>
        </div>
      </div>
        <hr/>
      <div className="content-container">
        <div className="main-content">
          <h2>What You'll Learn</h2>
          <p>{description}</p>
          {/* <h3>Curriculum</h3>
          <ul>
            <li>Introduction to HTML, CSS, and JavaScript</li>
            <li>Backend with Node.js</li>
            <li>Frontend with React.js</li>
          </ul> */}
        </div>

        <div className="sidebar">
          <div className="pricing">
            <p className="discounted-price">₹{price}</p>
            {/* <p className="original-price">$199.99</p>
            <p className="discount-info">Special Offer: 92% Off!</p> */}
            <button className="enroll-btn">Enroll Now</button>
          </div>
          <div className="course-details">
            <p>No.of Modules : {modules.length}</p>
            <p>Lifetime Access</p>
          </div>
        </div>
      </div>
        <hr/>
        <div>
        <h3 className='preview-heading'>Preview This Course</h3>
          <div className="course-preview">
            <div className="video-preview">
              <h4 className='preview-heading'>Sample Video</h4>
              <ReactPlayer
                url={`http://localhost:1234/gDrive/file/${currentVideo}`}
                controls
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              />
            </div>

            <div className="module-preview">
              <h4 className='preview-heading'>Modules Overview</h4>
              {modules.length > 0 ? (
                <ul className="module-overview-list">
                  {modules.map((module, idx) => (
                    <li key={idx} className={`module-item ${activeModule === idx ? 'active' : ''}`}>
                      <div className="module-header" onClick={() => toggleModule(idx)}>
                        <div>
                        <MdOutlineVideoLibrary /> <span className='module-name'>{module.moduleName}</span>
                        </div>
                        <span className={`toggle-icon ${activeModule === idx ? 'expanded' : ''}`}>
                          {activeModule === idx ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown/>}
                        </span>
                      </div>
                      {activeModule === idx && (
                        <ul className="video-list">
                          {module.videosList.map((video, index) => (
                            <li key={index} className="video-name">
                              <MdOndemandVideo /> {video.videoName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </div>

          </div>
        </div>
      <div className="register-prompt">
        <h2>Not Registered Yet?</h2>
        <p>Sign up now to access full course modules and videos!</p>
        <button className="register-btn">Register Now</button>
      </div>
      </div>
    </div>
  );
};

export default CoursePage;
