import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

export default function ProfessionalSignUp({ onSignUp, darkMode, toggleTheme }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        onSignUp && onSignUp();
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = (provider) => {
    // Mock social signup - replace with actual implementation
    console.log(`Sign up with ${provider}`);
    setError(`${provider} signup coming soon!`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
        `,
        p: 2,
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: 6,
          borderRadius: 4,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/login')}
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#667eea' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Person sx={{ fontSize: 36, color: 'white' }} />
          </MotionBox>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Join Our Team
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Create your account to access the Smart Traffic Management System
          </Typography>
        </Box>

        {/* Social Sign Up */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSocialSignUp('Google')}
              sx={{
                py: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
              }}
              startIcon={<GoogleIcon />}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSocialSignUp('GitHub')}
              sx={{
                py: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
              }}
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            <Chip 
              label="or" 
              size="small" 
              sx={{ 
                mx: 2, 
                background: 'rgba(255, 255, 255, 0.1)', 
                color: 'rgba(255, 255, 255, 0.7)',
                border: 'none',
              }} 
            />
            <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              background: 'rgba(244, 67, 54, 0.1)',
              color: '#ff6b6b',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              '& .MuiAlert-icon': { color: '#ff6b6b' },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Sign Up Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />

          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: 'rgba(102, 126, 234, 0.3)',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Create Account'
            )}
          </Button>
        </Box>

        {/* Sign In Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </MotionPaper>
    </Box>
  );
}