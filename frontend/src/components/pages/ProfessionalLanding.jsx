import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Fade,
  Grow,
  useScrollTrigger,
  Fab,
} from '@mui/material';
import {
  TrafficRounded as TrafficIcon,
  SmartToyRounded as AIIcon,
  SpeedRounded as SpeedIcon,
  TrendingUpRounded as TrendingUpIcon,
  Security as SecurityIcon,
  CloudDone as CloudIcon,
  PlayArrow as PlayIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Scroll to Top Button
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Fab
        onClick={handleClick}
        color="primary"
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;
        
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Feature Card Component
function FeatureCard({ icon, title, description, delay = 0 }) {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionCard
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
        hidden: { opacity: 0, y: 50 }
      }}
      sx={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
        },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
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
          {React.cloneElement(icon, { sx: { fontSize: 36, color: 'white' } })}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </MotionCard>
  );
}

export default function ProfessionalLanding() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <AIIcon />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze traffic patterns in real-time to optimize flow and reduce congestion.',
    },
    {
      icon: <SpeedIcon />,
      title: 'Real-Time Optimization',
      description: 'Dynamic traffic light timing and routing adjustments based on current conditions and predictive analytics.',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards and reports provide insights into traffic patterns and system efficiency.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Enterprise Security',
      description: 'Role-based access control and secure authentication ensure your traffic data remains protected.',
    },
    {
      icon: <CloudIcon />,
      title: 'Cloud-Ready',
      description: 'Scalable cloud deployment options with high availability and disaster recovery capabilities.',
    },
    {
      icon: <CheckIcon />,
      title: '99.9% Uptime',
      description: 'Enterprise-grade reliability with comprehensive monitoring and automated failover systems.',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Chip
                    label="AI-Powered Traffic Management"
                    sx={{
                      mb: 3,
                      background: 'rgba(102, 126, 234, 0.2)',
                      color: '#667eea',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 800,
                      mb: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                    }}
                  >
                    Smart Traffic Management System
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    Revolutionize urban mobility with AI-powered traffic optimization. 
                    Reduce congestion by 40%, improve efficiency by 60%, and create smarter cities.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/dashboard')}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
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
                      }}
                    >
                      Launch Dashboard
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: '#667eea',
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grow in timeout={1200}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 400,
                      height: 400,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                      border: '2px solid rgba(102, 126, 234, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 4s ease-in-out infinite',
                    }}
                  >
                    <TrafficIcon sx={{ fontSize: 120, color: '#667eea' }} />
                  </Box>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: 'rgba(0, 0, 0, 0.3)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { label: 'Traffic Reduction', value: 40, suffix: '%' },
              { label: 'Faster Travel Times', value: 25, suffix: '%' },
              { label: 'Fuel Efficiency', value: 60, suffix: '%' },
              { label: 'System Uptime', value: 99.9, suffix: '%' },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 600, mx: 'auto' }}
            >
              Advanced capabilities designed to transform your traffic management operations
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FeatureCard {...feature} delay={index * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, background: 'rgba(0, 0, 0, 0.3)' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to Transform Your City?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Join forward-thinking cities already using our Smart Traffic Management System
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                fontSize: '1.2rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>

      <ScrollTop />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}