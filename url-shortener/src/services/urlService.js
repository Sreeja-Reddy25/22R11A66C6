import customLogger from '../middleware/logger';

const urlDatabase = {};
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateRandomCode = (length = 6) => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const isShortcodeUnique = (code) => {
  return !urlDatabase.hasOwnProperty(code);
};

const createShortLink = ({ longUrl, customCode = null, validity }) => {
  let shortcode = customCode;

  const finalValidity = isNaN(validity) || validity <= 0 ? 30 : validity;

  if (shortcode) {
    if (!isShortcodeUnique(shortcode)) {
      customLogger('SHORTCODE_REJECTED', {
        shortcode,
        reason: 'Custom shortcode already in use'
      });
      throw new Error('Custom shortcode is already in use.');
    }
  } else {
    do {
      shortcode = generateRandomCode();
    } while (!isShortcodeUnique(shortcode));
  }

  const expiryTime = Date.now() + finalValidity * 60 * 1000;

  urlDatabase[shortcode] = {
    longUrl,
    expiresAt: expiryTime,
  };

  customLogger('URL_CREATED', {
    shortcode,
    longUrl,
    expiresAt: new Date(expiryTime).toISOString()
  });

  return {
    shortcode,
    longUrl,
    expiresAt: expiryTime,
  };
};

const getOriginalUrl = (shortcode) => {
  const entry = urlDatabase[shortcode];
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    customLogger('URL_EXPIRED', {
      shortcode,
      expiredAt: new Date(entry.expiresAt).toISOString()
    });
    delete urlDatabase[shortcode];
    return null;
  }

  return entry.longUrl;
};

const getAllActiveLinks = () => {
  const now = Date.now();
  return Object.entries(urlDatabase)
    .filter(([_, { expiresAt }]) => expiresAt > now)
    .map(([code, { longUrl, expiresAt }]) => ({
      shortcode: code,
      longUrl,
      expiresAt,
    }));
};

export {
  createShortLink,
  getOriginalUrl,
  getAllActiveLinks,
  isShortcodeUnique,
};
