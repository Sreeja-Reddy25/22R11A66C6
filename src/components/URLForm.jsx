import React, { useState } from 'react';
import customLogger from '../middleware/logger';

const URLForm = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      alert("Please enter a URL.");
      return;
    }

    const finalValidity = validity.trim() === '' ? 30 : parseInt(validity, 10);

    const urlData = {
      longUrl,
      customCode: customCode.trim() || null,
      validity: finalValidity,
    };

    customLogger('URL_SUBMITTED', urlData);
    onShorten(urlData);

    setLongUrl('');
    setCustomCode('');
    setValidity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Long URL:</label><br />
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>
      <div>
        <label>Custom Shortcode (optional):</label><br />
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="e.g., my-custom-code"
        />
      </div>
      <div>
        <label>Validity (in minutes, optional):</label><br />
        <input
          type="number"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          placeholder="30"
          min="1"
        />
      </div>
      <button type="submit">Shorten URL</button>
    </form>
  );
};

export default URLForm;
