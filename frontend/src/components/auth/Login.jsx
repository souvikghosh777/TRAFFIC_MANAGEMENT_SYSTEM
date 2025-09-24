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
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Traffic as TrafficIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import '../../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - accept any email/password combination
      // In real app, this would be an actual API call
      if (formData.email && formData.password) {
        // Store login state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError('');
    // In a real app, this would integrate with OAuth providers
    alert(`${provider} login would be implemented here`);
  };

  return (
    <Box className="auth-container">
      <Box className="auth-background">
        <Box className="auth-overlay" />
      </Box>
      
      <Box className="auth-content">
        <Card className="auth-card">
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
                Welcome Back
              </Typography>
              <Typography variant="body1" className="auth-subtitle">
                Sign in to your traffic management dashboard
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" className="auth-alert">
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
              />

              {/* Remember Me & Forgot Password */}
              <Box className="auth-options">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  variant="text"
                  size="small"
                  disabled={loading}
                  onClick={() => alert('Forgot password feature would be implemented here')}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="auth-submit-btn"
                startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>

            {/* Divider */}
            <Divider className="auth-divider">
              <Typography variant="body2" color="textSecondary">
                Or continue with
              </Typography>
            </Divider>

            {/* Social Login */}
            <Box className="auth-social">
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('Google')}
                className="auth-social-btn"
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin('Facebook')}
                className="auth-social-btn"
              >
                Facebook
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box className="auth-footer">
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;