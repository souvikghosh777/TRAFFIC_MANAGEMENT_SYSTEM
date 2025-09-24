import React from 'react';
import '../../styles/FeaturesSection.css';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  SmartToy as SmartToyIcon,
  MonitorHeart as MonitorHeartIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Analytics as AnalyticsIcon,
  CrisisAlert as CrisisAlertIcon,
  CloudSync as CloudSyncIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <SmartToyIcon />,
    title: 'AI-Powered Optimization',
    description: 'Advanced machine learning algorithms analyze traffic patterns in real-time to optimize signal timing and reduce congestion by up to 40%.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: <MonitorHeartIcon />,
    title: 'Real-Time Monitoring',
    description: 'Comprehensive dashboard provides live traffic data, system health metrics, and instant alerts for optimal traffic management decisions.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: <SettingsSuggestIcon />,
    title: 'Adaptive Control',
    description: 'Dynamic traffic light control that adapts to changing conditions, emergency situations, and special events automatically.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    icon: <AnalyticsIcon />,
    title: 'Predictive Analytics',
    description: 'Forecast traffic trends and identify potential bottlenecks before they occur using historical data and weather patterns.',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    icon: <CrisisAlertIcon />,
    title: 'Emergency Response',
    description: 'Instant emergency mode activation for first responders with priority routing and automatic traffic clearance protocols.',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    icon: <CloudSyncIcon />,
    title: 'Cloud Integration',
    description: 'Scalable cloud infrastructure ensures system reliability, data backup, and seamless updates across all traffic nodes.',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
];

const FeaturesSection = () => {
  return (
    <Box
      id="features"
      sx={{
        py: 10,
        background: 'rgba(30, 41, 59, 1)',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }} data-aos="fade-up">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Intelligent Traffic Solutions
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Cutting-edge technology that revolutionizes urban traffic management
            with AI-driven optimization and real-time analytics.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={feature.title}>
              <Card
                data-aos="fade-up"
                data-aos-delay={index * 100}
                sx={{
                  height: '100%',
                  background: 'rgba(15, 23, 42, 1)',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  borderRadius: 2,
                  p: 3,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: feature.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                    borderColor: 'primary.main',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      background: feature.gradient,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: 'white',
                      fontSize: '1.5rem',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;