/**
 * API Service for Smart Traffic Management System
 * Handles all HTTP requests to the Flask backend
 */

// Base URL for the backend API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// API Configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies for session management
};

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return { data, status: response.status };
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
};

/**
 * Authentication API Service
 */
export const authAPI = {
  /**
   * User login
   */
  login: async (credentials) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * User registration
   */
  register: async (userData) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * User logout
   */
  logout: async () => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Get current user information
   */
  getCurrentUser: async () => {
    return apiRequest('/api/auth/me');
  },
};

/**
 * Traffic Management API Service
 */
export const trafficAPI = {
  /**
   * Get current traffic system status
   */
  getStatus: async () => {
    return apiRequest('/api/traffic/status');
  },

  /**
   * Trigger traffic optimization
   */
  optimize: async (params = {}) => {
    return apiRequest('/api/traffic/optimize', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  /**
   * Get traffic analytics
   */
  getAnalytics: async () => {
    return apiRequest('/api/traffic/analytics');
  },

  /**
   * Handle emergency situation
   */
  handleEmergency: async (emergencyData) => {
    return apiRequest('/api/traffic/emergency', {
      method: 'POST',
      body: JSON.stringify(emergencyData),
    });
  },
};

/**
 * Location Management API Service
 */
export const locationAPI = {
  /**
   * Get all locations
   */
  getAll: async () => {
    return apiRequest('/api/locations');
  },

  /**
   * Create a new location
   */
  create: async (locationData) => {
    return apiRequest('/api/locations', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  },

  /**
   * Update an existing location
   */
  update: async (locationId, locationData) => {
    return apiRequest(`/api/locations/${locationId}`, {
      method: 'PUT',
      body: JSON.stringify(locationData),
    });
  },

  /**
   * Delete a location
   */
  delete: async (locationId) => {
    return apiRequest(`/api/locations/${locationId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * System Health API Service
 */
export const systemAPI = {
  /**
   * Health check
   */
  healthCheck: async () => {
    return apiRequest('/api/health');
  },

  /**
   * Get system information
   */
  getInfo: async () => {
    return apiRequest('/');
  },
};

/**
 * WebSocket Service for Real-time Updates
 */
export class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = {};
  }

  connect() {
    try {
      const wsUrl = API_BASE_URL.replace('http', 'ws') + '/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit('message', data);
          
          // Emit specific event types
          if (data.type) {
            this.emit(data.type, data);
          }
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }
}

/**
 * Error Handler Utility
 */
export const handleAPIError = (error, fallbackMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  if (error.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return fallbackMessage;
};

/**
 * API Response Cache
 */
class APICache {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes default TTL
  }

  set(key, data, ttl = this.ttl) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new APICache();

/**
 * Cached API request wrapper
 */
export const cachedApiRequest = async (endpoint, options = {}, cacheTTL = 300000) => {
  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
  
  // Check cache first
  const cachedData = apiCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Make API request
  const response = await apiRequest(endpoint, options);
  
  // Cache the response
  apiCache.set(cacheKey, response, cacheTTL);
  
  return response;
};

/**
 * Default export with all services
 */
const api = {
  auth: authAPI,
  traffic: trafficAPI,
  location: locationAPI,
  system: systemAPI,
  request: apiRequest,
  cachedRequest: cachedApiRequest,
  cache: apiCache,
  WebSocket: WebSocketService,
  handleError: handleAPIError,
};

export default api;