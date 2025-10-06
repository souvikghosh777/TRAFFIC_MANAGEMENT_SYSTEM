import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Card,
  CardContent,
  Fade,
  Grow,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  LoginRounded as LoginIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export default function ProfessionalLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);
    setError('');

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        onLogin && onLogin();
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <Container>
        <Fade in timeout={800}>
          <MotionCard
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              maxWidth: 480,
              width: '100%',
              mx: 'auto',
              borderRadius: 4,
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              overflow: 'visible',
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Grow in timeout={1000}>
                  <Box
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
                    <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </Grow>
                
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
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Sign in to your Smart Traffic Management account
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Fade in>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 3,
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
                      background: 'rgba(102, 126, 234, 0.6)',
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Divider */}
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    or continue with
                  </Typography>
                </Divider>

                {/* Social Login Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      '&:hover': {
                        borderColor: '#4285f4',
                        backgroundColor: 'rgba(66, 133, 244, 0.04)',
                      },
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      '&:hover': {
                        borderColor: '#333',
                        backgroundColor: 'rgba(51, 51, 51, 0.04)',
                      },
                    }}
                  >
                    GitHub
                  </Button>
                </Box>

                {/* Sign Up Link */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => navigate('/signup')}
                      sx={{
                        fontWeight: 600,
                        textDecoration: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </MotionCard>
        </Fade>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>
    </Box>
  );
}

const Container = ({ children }) => (
  <Box sx={{ width: '100%', maxWidth: '600px', px: 3 }}>
    {children}
  </Box>
);