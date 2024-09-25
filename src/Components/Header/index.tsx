import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="mx-auto max-w-lg pb-8">
      <ul className="flex justify-between text-2xl">
        <Link
          to="/"
          className="pb-2 focus:border-b-2 focus:border-firstBlue focus:text-firstBlue active:text-firstBlue"
        >
          {' '}
          Connection
        </Link>
        <Link
          to="/inscription"
          className="pb-2 focus:border-b-2 focus:border-firstBlue focus:text-firstBlue active:text-firstBlue "
        >
          {' '}
          Inscription
        </Link>
      </ul>
    </div>
  );
};

export default Header;
