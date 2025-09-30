import "./Navbar.scss"

function Navbar() {

  return (
    <div style={{ borderBottom: "2px solid white", height: "100px" }} className="d-flex align-items-center">
      <a href="/">
        <svg className="icon" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect className="rect" width="50" height="50" x="10" y="10" rx="5" ry="5" fill="white" stroke="black"
            strokeWidth="5" />
          <text className="text" x="16" y="45" fill="black" fontSize="30" fontFamily="Roboto" fontWeight={700}>DR</text>
          Sorry, your browser does not support inline SVG.
        </svg>
      </a>
      <a href="/" className="ms-5 me-5 navlink">
        Home
      </a>
      <a href="/gasket" className="me-5 navlink">
        Gasket
      </a>
    </div>
  );
}

export default Navbar;