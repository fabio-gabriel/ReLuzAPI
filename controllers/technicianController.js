const Technician = require('../models/Technician');
const Panel = require('../models/Panel');

const technicianController = {
  async assignTechnician(req, res) {
    try {
      const { panelId, technicianId } = req.body;
      
      const panel = await Panel.findById(panelId);
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      const assignment = await Technician.assignToPanel(panelId, technicianId);
      res.status(201).json(assignment);
    } catch (error) {
      console.error('Assign technician error:', error);
      res.status(500).json({ error: 'Failed to assign technician' });
    }
  },

  async removeTechnician(req, res) {
    try {
      const { panelId, technicianId } = req.params;
      
      await Technician.removeFromPanel(panelId, technicianId);
      res.json({ message: 'Technician removed successfully' });
    } catch (error) {
      console.error('Remove technician error:', error);
      res.status(500).json({ error: 'Failed to remove technician' });
    }
  },

  async getPanelTechnicians(req, res) {
    try {
      const { panelId } = req.params;
      
      const technicians = await Technician.getPanelTechnicians(panelId);
      res.json(technicians);
    } catch (error) {
      console.error('Get panel technicians error:', error);
      res.status(500).json({ error: 'Failed to get panel technicians' });
    }
  },

  async getTechnicianPanels(req, res) {
    try {
      const { technicianId } = req.params;
      
      const panels = await Technician.getTechnicianPanels(technicianId);
      res.json(panels);
    } catch (error) {
      console.error('Get technician panels error:', error);
      res.status(500).json({ error: 'Failed to get technician panels' });
    }
  }
};

module.exports = technicianController;