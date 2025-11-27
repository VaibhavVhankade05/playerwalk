import "../styles/navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar px-3">
        <div className="navbar-content">
          <div className="logo ms-2">PlayerWalk</div>
          <sub className="live-wrapper">
            <div className="live-tag ms-2 p-2">Cricket</div>
          </sub>
        </div>
      </nav>
    </>
  );
}
