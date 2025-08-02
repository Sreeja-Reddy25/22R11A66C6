import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Redirector() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("urlMap")) || {};
    const longUrl = data[shortCode];
    if (longUrl) {
      window.location.href = longUrl;
    } else {
      alert("Short URL not found. Redirecting to home.");
      navigate("/");
    }
  }, [shortCode, navigate]);

  return <p>Redirecting...</p>;
}

export default Redirector;
