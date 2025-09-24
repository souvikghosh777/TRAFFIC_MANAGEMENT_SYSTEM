import React from 'react';
import '../../styles/AboutSection.css';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  School as SchoolIcon,
  Public as PublicIcon,
  Nature as EcoIcon,
} from '@mui/icons-material';

const aboutFeatures = [
  {
    icon: <SchoolIcon />,
    title: 'Research & Development',
    description: 'Our team of experts in AI, machine learning, and transportation engineering continuously innovate to solve complex urban mobility challenges.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: <PublicIcon />,
    title: 'Global Impact',
    description: 'Deployed in over 50 cities worldwide, our solutions have reduced traffic congestion and improved urban mobility for millions of commuters.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: <EcoIcon />,
    title: 'Environmental Benefits',
    description: 'By optimizing traffic flow, we help reduce emissions, fuel consumption, and contribute to building more sustainable smart cities.',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

const AboutSection = () => {
  return (
    <Box
      id="about"
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
            About SmartTraffic
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
            Leading the future of intelligent transportation systems with cutting-edge AI technology,
            machine learning algorithms, and real-time optimization capabilities.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {aboutFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
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

export default AboutSection;