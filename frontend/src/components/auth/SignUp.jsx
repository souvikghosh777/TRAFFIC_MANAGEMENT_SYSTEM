import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
  Traffic as TrafficIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import '../../styles/Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return '';
    }
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
      case 1: return 'error';
      case 2: return 'warning';
      case 3: return 'info';
      case 4:
      case 5: return 'success';
      default: return 'error';
    }
  };

  const validateForm = () => {
    if (!formData.firstName) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.organization) {
      setError('Organization is required');
      return false;
    }
    if (!formData.role) {
      setError('Role is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes - simulate successful registration
      // In real app, this would be an actual API call
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        role: formData.role,
        createdAt: new Date().toISOString()
      };

      // Store user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userEmail', formData.email);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    setError('');
    // In a real app, this would integrate with OAuth providers
    alert(`${provider} signup would be implemented here`);
  };

  return (
    <Box className="auth-container">
      <Box className="auth-background">
        <Box className="auth-overlay" />
      </Box>
      
      <Box className="auth-content signup-content">
        <Card className="auth-card signup-card">
          <CardContent className="auth-card-content">
            {/* Header */}
            <Box className="auth-header">
              <Box className="auth-logo">
                <TrafficIcon className="auth-logo-icon" />
                <Typography variant="h5" className="auth-logo-text">
                  Smart Traffic
                </Typography>
              </Box>
              <Typography variant="h4" className="auth-title">
                Create Account
              </Typography>
              <Typography variant="body1" className="auth-subtitle">
                Join our traffic management platform
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" className="auth-alert">
                {error}
              </Alert>
            )}

            {/* Sign Up Form */}
            <Box component="form" onSubmit={handleSubmit} className="auth-form signup-form">
              {/* Personal Information */}
              <Typography variant="h6" className="form-section-title">
                <PersonIcon sx={{ fontSize: '1.2rem' }} />
                Personal Information
              </Typography>
              
              <Box className="form-row">
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={loading}
                  className="auth-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter first name"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={loading}
                  className="auth-input"
                  placeholder="Enter last name"
                />
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={loading}
                className="auth-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your email"
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={loading}
                className="auth-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter phone number"
              />

              {/* Organization Information */}
              <Typography variant="h6" className="form-section-title">
                <BusinessIcon sx={{ fontSize: '1.2rem' }} />
                Organization Details
              </Typography>

              <TextField
                fullWidth
                label="Organization"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                disabled={loading}
                className="auth-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter organization name"
              />

              <FormControl fullWidth className="auth-input">
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  disabled={loading}
                  label="Role"
                >
                  <MenuItem value="traffic_manager">Traffic Manager</MenuItem>
                  <MenuItem value="system_administrator">System Administrator</MenuItem>
                  <MenuItem value="data_analyst">Data Analyst</MenuItem>
                  <MenuItem value="engineer">Traffic Engineer</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
                </Select>
              </FormControl>

              {/* Security */}
              <Typography variant="h6" className="form-section-title">
                <LockIcon sx={{ fontSize: '1.2rem' }} />
                Security
              </Typography>

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={loading}
                className="auth-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Create a strong password"
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <Box className="password-strength">
                  <Typography variant="caption" color="textSecondary">
                    Password Strength: {getPasswordStrengthLabel()}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(getPasswordStrength() / 5) * 100}
                    color={getPasswordStrengthColor()}
                    className="password-strength-bar"
                  />
                </Box>
              )}

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                disabled={loading}
                className="auth-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Confirm your password"
              />

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    disabled={loading}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Button variant="text" size="small" sx={{ p: 0, minWidth: 'auto' }}>
                      Terms and Conditions
                    </Button>{' '}
                    and{' '}
                    <Button variant="text" size="small" sx={{ p: 0, minWidth: 'auto' }}>
                      Privacy Policy
                    </Button>
                  </Typography>
                }
                className="terms-checkbox"
              />

              {/* Sign Up Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="auth-submit-btn"
                startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

            {/* Divider */}
            <Divider className="auth-divider">
              <Typography variant="body2" color="textSecondary">
                Or sign up with
              </Typography>
            </Divider>

            {/* Social Sign Up */}
            <Box className="auth-social">
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialSignup('Google')}
                className="auth-social-btn"
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialSignup('Facebook')}
                className="auth-social-btn"
              >
                Facebook
              </Button>
            </Box>

            {/* Login Link */}
            <Box className="auth-footer">
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignUp;