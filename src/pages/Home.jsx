import React, { useState } from "react";

function generateShortCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleShorten = () => {
    const code = generateShortCode();
    const data = JSON.parse(localStorage.getItem("urlMap")) || {};
    data[code] = longUrl;
    localStorage.setItem("urlMap", JSON.stringify(data));
    setShortCode(code);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Frontend-Only URL Shortener</h2>
      <input
        type="text"
        value={longUrl}
        placeholder="Enter Long URL"
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "300px", padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={handleShorten}>Shorten</button>

      {shortCode && (
        <div style={{ marginTop: "1rem" }}>
          Short URL: <a href={`/${shortCode}`}>{window.location.origin}/{shortCode}</a>
        </div>
      )}
    </div>
  );
}

export default Home;
