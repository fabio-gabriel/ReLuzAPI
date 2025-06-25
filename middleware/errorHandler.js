const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details
    });
  }

  if (err.code === 'auth/id-token-expired') {
    return res.status(401).json({ error: 'Token expired' });
  }

  if (err.code === 'auth/argument-error') {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
};

module.exports = errorHandler;