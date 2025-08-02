const customLogger = (event, data) => {
 
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    data
  };
 
  console.log(JSON.stringify(logEntry)); 
};

export default customLogger;
