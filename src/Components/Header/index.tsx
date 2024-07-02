import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="max-w-lg mx-auto pb-8">
      <ul className="flex justify-between text-2xl text-textColor">
        <Link
          to="/"
          className="active:text-firstBlue focus:border-b-2 focus:border-firstBlue focus:text-firstBlue pb-2"
        >
          {' '}
          Connection
        </Link>
        <Link
          to="/Register"
          className="active:text-firstBlue focus:border-b-2 focus:border-firstBlue focus:text-firstBlue pb-2 "
        >
          {' '}
          Inscription
        </Link>
      </ul>
    </div>
  );
};

export default Header;
