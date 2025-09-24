import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/HeroSection.css';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Info as InfoIcon,
  Traffic as TrafficIcon
} from '@mui/icons-material';
import TrafficLight from '../ui/TrafficLight';

const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [systemStats, setSystemStats] = useState({
    efficiency: 92,
    activeNodes: 4
  });

  const [trafficStates, setTrafficStates] = useState({
    north: 'red',
    east: 'green', 
    south: 'red',
    west: 'green'
  });

  // Simulate traffic light changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficStates(prev => {
        const states = ['red', 'yellow', 'green'];
        const directions = Object.keys(prev);
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const currentState = prev[randomDirection];
        const currentIndex = states.indexOf(currentState);
        const nextIndex = (currentIndex + 1) % states.length;
        
        return {
          ...prev,
          [randomDirection]: states[nextIndex]
        };
      });

      // Update system stats occasionally
      if (Math.random() > 0.7) {
        setSystemStats(prev => ({
          efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() * 6) - 3)),
          activeNodes: prev.activeNodes
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse at top, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
        `,
        position: 'relative',
        pt: { xs: 8, md: 10 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23334155' fill-opacity='0.05'><rect width='1' height='1'/></g></g></svg>")`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Box data-aos="fade-up" data-aos-duration="800">
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                The Future of{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Smart Traffic
                </Box>{' '}
                Management
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.7,
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Revolutionary AI-powered traffic management system that optimizes traffic flow,
                reduces congestion, and improves urban mobility through real-time monitoring
                and intelligent control.
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' }
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '0.75rem',
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '280px', sm: 'none' },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px 0 rgba(37, 99, 235, 0.4)',
                    },
                  }}
                >
                  Launch Dashboard
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<InfoIcon />}
                  onClick={scrollToFeatures}
                  sx={{
                    borderColor: 'rgba(51, 65, 85, 1)',
                    color: 'text.primary',
                    borderRadius: '0.75rem',
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '280px', sm: 'none' },
                    '&:hover': {
                      backgroundColor: 'rgba(30, 41, 59, 1)',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Dashboard Preview */}
          <Grid item xs={12} md={6}>
            <Box 
              data-aos="fade-left" 
              data-aos-duration="800" 
              data-aos-delay="200"
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: { xs: 4, md: 0 }
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  background: 'rgba(30, 41, 59, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Dashboard Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, pb: 2, borderBottom: '1px solid rgba(100, 116, 139, 0.2)' }}>
                  <TrafficIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Live System Monitor
                  </Typography>
                </Box>

                {/* System Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Card sx={{ 
                      background: 'rgba(37, 99, 235, 0.1)', 
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      textAlign: 'center',
                      p: 2
                    }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                        {Math.round(systemStats.efficiency)}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Efficiency
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ 
                      background: 'rgba(37, 99, 235, 0.1)', 
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      textAlign: 'center',
                      p: 2
                    }}>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                        {systemStats.activeNodes}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Active Nodes
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>

                {/* Traffic Lights */}
                <Grid container spacing={2} justifyContent="space-around">
                  {Object.entries(trafficStates).map(([direction, state]) => (
                    <Grid item key={direction}>
                      <TrafficLight 
                        direction={direction} 
                        activeLight={state}
                        size="small"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;