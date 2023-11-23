import { NavLink } from "react-router-dom";

function Header() {
  const navLinkStyle = {
    textDecoration: "none", // Remove default link underline
    transition: "background-color 0.3s, color 0.3s", // Add a smooth transition effect
  };

  const onFocusStyle = {
    backgroundColor: "blue", // Change the background color when in focus
    color: "white", // Change the text color when in focus
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'indigo-900', // Set your desired background color from Tailwind CSS
    zIndex: 1000, // Adjust the z-index as needed
  };

  return (
    <div >
      <header style={headerStyle} className="flex border space-x-8 justify-between items-center py-2 px-2 bg-gray-800 text-gray-300">
        <div className="flex space-x-4">
          <NavLink to="/" style={navLinkStyle} activeStyle={onFocusStyle}>Movies</NavLink>
          <NavLink to="/watchlist" style={navLinkStyle} activeStyle={onFocusStyle}>Watchlist</NavLink>
        </div>
        
      </header>
    </div>
  );
}

export default Header;