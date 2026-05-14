import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="p-6 mx-auto text-center">
      <Link to="/" className="text-blue-600 underline block mb-4">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-4">About App</h1>
      <p className="mb-2">Author: AnnStarrySky</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        RS School React Course
      </a>
    </div>
  );
};

export default About;