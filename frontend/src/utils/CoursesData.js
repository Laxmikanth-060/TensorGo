const courses = [
    {
      id: 1,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 30,
      name: "Amazon Web Services",
      description:
        "AWS (Amazon Web Services) is a comprehensive cloud computing platform offering a wide range of services including computing power, storage, and databases, enabling scalable and cost-effective cloud solutions.",
      instructorName: "Abhilash",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 2500,
      discountInPercentage: 0,
      enrollmentsCount: 25,
      rating: 4.5,
    },
    {
      id: 2,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 40,
      name: "Data Science with Python",
      description:
        "Learn data science concepts and techniques using Python, including data manipulation, visualization, and machine learning.",
      instructorName: "Sophia",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 3000,
      discountInPercentage: 10,
      enrollmentsCount: 26,
      rating: 4,
    },
    {
      id: 3,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 25,
      name: "Introduction to React",
      description:
        "A beginner's course on React, the popular JavaScript library for building user interfaces, covering components, state, and props.",
      instructorName: "James",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 2000,
      discountInPercentage: 5,
      enrollmentsCount: 10,
      rating: 4.2,
    },
    {
      id: 4,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 50,
      name: "Full Stack Web Development",
      description:
        "Master full stack web development with hands-on experience in front-end and back-end technologies including HTML, CSS, JavaScript, Node.js, and MongoDB.",
      instructorName: "Michael",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 4500,
      discountInPercentage: 15,
      enrollmentsCount: 8,
      rating: 3,
    },
    {
      id: 5,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 20,
      name: "Digital Marketing Basics",
      description:
        "An introductory course on digital marketing covering SEO, social media marketing, content marketing, and analytics.",
      instructorName: "Emily",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 1500,
      discountInPercentage: 20,
      enrollmentsCount: 35,
      rating: 3.5,
    },
    {
      id: 6,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 35,
      name: "Machine Learning A-Z",
      description:
        "A comprehensive guide to machine learning covering supervised, unsupervised, and reinforcement learning algorithms with practical examples.",
      instructorName: "Oliver",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 3500,
      discountInPercentage: 10,
      enrollmentsCount: 25,
      rating: 3.4,
    },
    {
      id: 7,
      courseImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PU9BE8SU55L71BGU2BdUWfUPjPhwDHjwPw&s",
      duration: 45,
      name: "Cloud Computing with Azure",
      description:
        "Learn the fundamentals of cloud computing with Microsoft Azure, including infrastructure, services, and deployment models.",
      instructorName: "Isabella",
      instructorPhotoUrl:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      price: 4000,
      discountInPercentage: 5,
      enrollmentsCount: 22,
      rating: 4,
    },
  ];
  
  function CoursesData() {
    return courses;
  }
  
  export default CoursesData;