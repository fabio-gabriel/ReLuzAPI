const Panel = require('../models/Panel');

const measurementController = {
  async addMeasurement(req, res) {
    try {
      const { panelId } = req.params;
      const { voltage, temperature, luminosity } = req.body;
      
      const panel = await Panel.findById(panelId);
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      const measurementData = { voltage, temperature, luminosity };
      const newMeasurement = await Panel.addMeasurement(panelId, measurementData);
      
      res.status(201).json(newMeasurement);
    } catch (error) {
      console.error('Add measurement error:', error);
      res.status(500).json({ error: 'Failed to add measurement' });
    }
  },

  async getMeasurements(req, res) {
    try {
      const { panelId } = req.params;
      const { startDate, endDate } = req.query;
      
      const panel = await Panel.findById(panelId);
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      // Check if user has access to this panel's measurements
      if (req.userRole === 'customer' && panel.owner_id !== req.user.uid) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      const measurements = await Panel.getMeasurements(panelId, startDate, endDate);
      res.json(measurements);
    } catch (error) {
      console.error('Get measurements error:', error);
      res.status(500).json({ error: 'Failed to get measurements' });
    }
  }
};

module.exports = measurementController;