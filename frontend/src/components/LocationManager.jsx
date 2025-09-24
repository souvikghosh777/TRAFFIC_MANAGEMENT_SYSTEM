import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Traffic as TrafficIcon,
  Map as MapIcon
} from '@mui/icons-material';
import '../styles/LocationManager.css';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    type: 'intersection',
    priority: 'medium',
    description: '',
    capacity: '',
    currentTraffic: 'normal'
  });

  // Load saved locations from localStorage on component mount
  useEffect(() => {
    const savedLocations = localStorage.getItem('trafficLocations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    }
  }, []);

  // Save locations to localStorage whenever locations change
  useEffect(() => {
    localStorage.setItem('trafficLocations', JSON.stringify(locations));
  }, [locations]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, address, latitude, longitude } = formData;
    
    if (!name.trim()) {
      showSnackbar('Location name is required', 'error');
      return false;
    }
    
    if (!address.trim()) {
      showSnackbar('Address is required', 'error');
      return false;
    }
    
    if (!latitude || !longitude) {
      showSnackbar('Both latitude and longitude are required', 'error');
      return false;
    }
    
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || lat < -90 || lat > 90) {
      showSnackbar('Latitude must be between -90 and 90', 'error');
      return false;
    }
    
    if (isNaN(lng) || lng < -180 || lng > 180) {
      showSnackbar('Longitude must be between -180 and 180', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const newLocation = {
      id: editingLocation ? editingLocation.id : Date.now(),
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      dateAdded: editingLocation ? editingLocation.dateAdded : new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    if (editingLocation) {
      setLocations(prev => prev.map(loc => 
        loc.id === editingLocation.id ? newLocation : loc
      ));
      showSnackbar('Location updated successfully', 'success');
    } else {
      setLocations(prev => [...prev, newLocation]);
      showSnackbar('Location added successfully', 'success');
    }
    
    handleCloseDialog();
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      type: location.type,
      priority: location.priority,
      description: location.description || '',
      capacity: location.capacity || '',
      currentTraffic: location.currentTraffic || 'normal'
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
    showSnackbar('Location deleted successfully', 'success');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLocation(null);
    setFormData({
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      type: 'intersection',
      priority: 'medium',
      description: '',
      capacity: '',
      currentTraffic: 'normal'
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          showSnackbar('Current location detected', 'success');
        },
        (error) => {
          showSnackbar('Unable to get current location', 'error');
        }
      );
    } else {
      showSnackbar('Geolocation is not supported by this browser', 'error');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'heavy': return 'error';
      case 'moderate': return 'warning';
      case 'light': return 'success';
      case 'normal': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box className="location-manager">
      <Card className="location-manager-card">
        <CardContent>
          <Box className="location-manager-header">
            <Box className="header-content">
              <MapIcon className="header-icon" />
              <Typography variant="h5" component="h2">
                Location Manager
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              className="add-location-btn"
            >
              Add Location
            </Button>
          </Box>

          <Typography variant="body2" className="manager-description">
            Manage traffic monitoring locations manually. Add intersections, roads, and custom monitoring points.
          </Typography>

          <Box className="locations-list">
            {locations.length === 0 ? (
              <Box className="empty-state">
                <LocationIcon className="empty-icon" />
                <Typography variant="h6">No locations added yet</Typography>
                <Typography variant="body2" color="textSecondary">
                  Click "Add Location" to start monitoring traffic at specific locations
                </Typography>
              </Box>
            ) : (
              <List>
                {locations.map((location) => (
                  <ListItem key={location.id} className="location-item">
                    <Box className="location-content">
                      <ListItemText
                        primary={
                          <Box className="location-primary">
                            <Typography variant="h6">{location.name}</Typography>
                            <Box className="location-chips">
                              <Chip 
                                label={location.type} 
                                size="small" 
                                variant="outlined"
                              />
                              <Chip 
                                label={location.priority} 
                                size="small" 
                                color={getPriorityColor(location.priority)}
                              />
                              <Chip 
                                label={location.currentTraffic} 
                                size="small" 
                                color={getTrafficColor(location.currentTraffic)}
                              />
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box className="location-secondary">
                            <Typography variant="body2" color="textSecondary">
                              📍 {location.address}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              🌐 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                            </Typography>
                            {location.description && (
                              <Typography variant="body2" color="textSecondary">
                                📝 {location.description}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </Box>
                    <ListItemSecondaryAction className="location-actions">
                      <IconButton 
                        edge="end" 
                        onClick={() => handleEdit(location)}
                        className="edit-btn"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleDelete(location.id)}
                        className="delete-btn"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Add/Edit Location Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        className="location-dialog"
      >
        <DialogTitle className="dialog-title">
          <TrafficIcon />
          {editingLocation ? 'Edit Location' : 'Add New Location'}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Main St & Oak Ave"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Full street address"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Latitude"
                type="number"
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                placeholder="40.7128"
                required
                inputProps={{ step: 'any' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Longitude"
                type="number"
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                placeholder="-74.0060"
                required
                inputProps={{ step: 'any' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={getCurrentLocation}
                startIcon={<LocationIcon />}
                className="location-btn"
              >
                Use Current Location
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Location Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  label="Location Type"
                >
                  <MenuItem value="intersection">Intersection</MenuItem>
                  <MenuItem value="highway">Highway</MenuItem>
                  <MenuItem value="bridge">Bridge</MenuItem>
                  <MenuItem value="tunnel">Tunnel</MenuItem>
                  <MenuItem value="roundabout">Roundabout</MenuItem>
                  <MenuItem value="custom">Custom Point</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Current Traffic</InputLabel>
                <Select
                  value={formData.currentTraffic}
                  onChange={(e) => handleInputChange('currentTraffic', e.target.value)}
                  label="Current Traffic"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="heavy">Heavy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacity (vehicles/hour)"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                placeholder="1200"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Additional notes about this location..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            className="save-btn"
          >
            {editingLocation ? 'Update' : 'Add'} Location
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LocationManager;