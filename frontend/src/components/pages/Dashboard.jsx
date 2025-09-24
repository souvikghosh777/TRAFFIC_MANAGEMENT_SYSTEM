import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Traffic as TrafficIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TrafficLight from '../ui/TrafficLight';
import LocationManager from '../LocationManager';
import Analytics from '../Analytics';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [systemStatus, setSystemStatus] = useState('active');
  const [trafficData, setTrafficData] = useState({
    activeIntersections: 42,
    avgWaitTime: 35,
    trafficFlow: 'optimal',
    systemUptime: '99.7%',
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statsCards = [
    {
      title: 'Active Intersections',
      value: trafficData.activeIntersections,
      icon: <TrafficIcon />,
      color: 'primary.main',
      trend: '+5%',
    },
    {
      title: 'Average Wait Time',
      value: trafficData.avgWaitTime,
      icon: <SpeedIcon />,
      color: 'success.main',
      trend: '-12%',
    },
    {
      title: 'Traffic Flow',
      value: trafficData.trafficFlow,
      icon: <TrendingUpIcon />,
      color: 'info.main',
      trend: 'optimal',
    },
    {
      title: 'System Uptime',
      value: trafficData.systemUptime,
      icon: <CheckCircleIcon />,
      color: 'success.main',
      trend: 'stable',
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
        <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
          Loading Dashboard...
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
          Connecting to traffic management system
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Traffic Control Dashboard
            </Typography>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>

          <Alert
            severity={systemStatus === 'active' ? 'success' : 'warning'}
            icon={systemStatus === 'active' ? <CheckCircleIcon /> : <WarningIcon />}
            sx={{
              backgroundColor: systemStatus === 'active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
              border: `1px solid ${systemStatus === 'active' ? theme.palette.success.main : theme.palette.warning.main}`,
              color: systemStatus === 'active' ? theme.palette.success.main : theme.palette.warning.main,
            }}
          >
            System Status: {systemStatus === 'active' ? 'All systems operational' : 'Minor issues detected'}
          </Alert>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            <Tab 
              label="Overview" 
              icon={<DashboardIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Analytics" 
              icon={<AssessmentIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Location Manager" 
              icon={<LocationIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <>
            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statsCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={card.title}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            background: card.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {card.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: 'white',
                          }}
                        >
                          {card.value}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          mb: 1,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'success.main',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {card.trend}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Main Content Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 3,
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TrafficIcon />
                    Live Traffic Monitor
                  </Typography>
                  <TrafficLight />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mt: 3,
                      textAlign: 'center',
                    }}
                  >
                    Real-time traffic light simulation showing current intersection status
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 3,
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <DashboardIcon />
                    AI Control Center
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    The AI engine is continuously analyzing traffic patterns, weather conditions, 
                    and special events to optimize signal timing across the entire network.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setActiveTab(1)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        flex: 1,
                      }}
                    >
                      View Analytics
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        flex: 1,
                      }}
                    >
                      Settings
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 1 && (
          <Analytics />
        )}

        {/* Location Manager Tab */}
        {activeTab === 2 && (
          <LocationManager />
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;