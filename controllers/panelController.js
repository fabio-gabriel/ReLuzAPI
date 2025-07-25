const Panel = require('../models/Panel');

const panelController = {
  async createPanel(req, res) {
    try {
      const { name, location, installation_date, status } = req.body;
      const ownerId = req.user.uid;
      
      const panelData = { name, location, installation_date, status };
      const newPanel = await Panel.create(panelData, ownerId);
      
      res.status(201).json(newPanel);
    } catch (error) {
      console.error('Create panel error:', error);
      res.status(500).json({ error: 'Failed to create panel' });
    }
  },

  async getAllPanels(req, res) {
    try {
      let panels;
      
      // If user is customer, only show their panels
      if (req.userRole === 'customer') {
        panels = await Panel.findByOwner(req.user.uid);
      } else {
        // Technicians and admins can see all panels
        panels = await Panel.getAll();
      }
      
      res.json(panels);
    } catch (error) {
      console.error('Get panels error:', error);
      res.status(500).json({ error: 'Failed to get panels' });
    }
  },

  async getPanelById(req, res) {
    try {
      const { id } = req.params;
      const panel = await Panel.findById(id);
      
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      // Check if user has access to this panel
      if (req.userRole === 'customer' && panel.owner_id !== req.user.uid) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      res.json(panel);
    } catch (error) {
      console.error('Get panel error:', error);
      res.status(500).json({ error: 'Failed to get panel' });
    }
  },

  async updatePanel(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const panel = await Panel.findById(id);
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      // Check if user has access to update this panel
      if (req.userRole === 'customer' && panel.owner_id !== req.user.uid) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      const updatedPanel = await Panel.update(id, updateData);
      res.json(updatedPanel);
    } catch (error) {
      console.error('Update panel error:', error);
      res.status(500).json({ error: 'Failed to update panel' });
    }
  },

  async deletePanel(req, res) {
    try {
      const { id } = req.params;
      
      const panel = await Panel.findById(id);
      if (!panel) {
        return res.status(404).json({ error: 'Panel not found' });
      }
      
      // Check if user has access to delete this panel
      if (req.userRole === 'customer' && panel.owner_id !== req.user.uid) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      await Panel.delete(id);
      res.json({ message: 'Panel deleted successfully' });
    } catch (error) {
      console.error('Delete panel error:', error);
      res.status(500).json({ error: 'Failed to delete panel' });
    }
  }
};

module.exports = panelController;