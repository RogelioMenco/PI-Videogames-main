import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="background">
      <div className="title">
        <Link to="/home">
          <button className="title" type="submit">
            INGRESAR
          </button>
        </Link>
      </div>
    </div>
  );
}
