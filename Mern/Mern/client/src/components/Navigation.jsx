import { Link, NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-3"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="material-icons me-2">assignment</i> NotesApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                end
              >
                Notes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Create Note
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Create User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
