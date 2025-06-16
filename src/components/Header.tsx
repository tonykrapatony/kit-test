import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">My Blog</Link>
        <Link to="/create" className="bg-white text-blue-600 px-4 py-1 rounded">
          + New Post
        </Link>
      </div>
    </header>
  );
};

export default Header;
