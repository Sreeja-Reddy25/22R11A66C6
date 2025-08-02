import React, { useEffect, useState } from 'react';

const URLList = ({ links }) => {
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = Date.now();
      const newCountdowns = {};
      links.forEach(link => {
        const diff = link.expiresAt - now;
        if (diff > 0) {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          newCountdowns[link.shortcode] = `${minutes}m ${seconds}s`;
        } else {
          newCountdowns[link.shortcode] = 'Expired';
        }
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [links]);

  return (
    <div>
      <h3>Shortened URLs</h3>
      {links.length === 0 ? (
        <p>No links generated yet.</p>
      ) : (
        <ul>
          {links.map(link => (
            <li key={link.shortcode}>
              <strong>Short:</strong> {window.location.origin}/{link.shortcode} <br />
              <strong>Original:</strong> {link.longUrl} <br />
              <strong>Expires in:</strong> {countdowns[link.shortcode]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default URLList;
