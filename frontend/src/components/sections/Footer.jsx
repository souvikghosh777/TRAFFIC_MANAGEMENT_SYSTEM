import React from 'react';
import '../../styles/Footer.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Traffic as TrafficIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  Science as ScienceIcon,
  Business as BusinessIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'AI Traffic Management', href: '#features', icon: <TrafficIcon /> },
        { name: 'Real-time Monitoring', href: '#features', icon: <SpeedIcon /> },
        { name: 'Analytics Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { name: 'Performance Analytics', href: '#stats', icon: <TrendingUpIcon /> },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about', icon: <BusinessIcon /> },
        { name: 'Research & Development', href: '#about', icon: <ScienceIcon /> },
        { name: 'Contact Sales', href: '#contact', icon: <EmailIcon /> },
        { name: 'Support Center', href: '#contact', icon: <EmailIcon /> },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/dashboard', icon: <DashboardIcon /> },
        { name: 'API Reference', href: '/dashboard', icon: <DashboardIcon /> },
        { name: 'Case Studies', href: '#stats', icon: <TrendingUpIcon /> },
        { name: 'White Papers', href: '#about', icon: <ScienceIcon /> },
      ],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: '#', color: '#0A66C2' },
    { name: 'Twitter', icon: <TwitterIcon />, href: '#', color: '#1DA1F2' },
    { name: 'GitHub', icon: <GitHubIcon />, href: '#', color: '#181717' },
    { name: 'Email', icon: <EmailIcon />, href: 'mailto:contact@smarttraffic.ai', color: '#EA4335' },
  ];

  const handleInternalNavigation = (href) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        py: 6,
        borderTop: '1px solid rgba(100, 116, 139, 0.2)',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box data-aos="fade-up">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SmartTraffic
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Revolutionizing urban mobility with AI-powered traffic management 
                solutions that reduce congestion, improve safety, and create 
                smarter cities for everyone.
              </Typography>
              <Button
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Launch Dashboard
              </Button>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={2.67} key={section.title}>
              <Box data-aos="fade-up" data-aos-delay={index * 100}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {section.links.map((link) => (
                    <Box
                      component="li"
                      key={link.name}
                      sx={{ mb: 1 }}
                    >
                      <Button
                        variant="text"
                        startIcon={link.icon}
                        onClick={() => handleInternalNavigation(link.href)}
                        sx={{
                          color: 'text.secondary',
                          justifyContent: 'flex-start',
                          p: 0.5,
                          minWidth: 'auto',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        {link.name}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(100, 116, 139, 0.2)', mb: 4 }} />

        {/* Bottom Footer */}
        <Box
          data-aos="fade-up"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {currentYear} SmartTraffic AI Solutions. All rights reserved. | 
            Built with advanced machine learning and real-time analytics.
          </Typography>

          {/* Social Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="text"
                component="a"
                href={social.href}
                target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel={social.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  color: 'text.secondary',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  '&:hover': {
                    color: social.color,
                    borderColor: social.color,
                    backgroundColor: `${social.color}15`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {social.icon}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Performance Badge */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            pt: 3,
            borderTop: '1px solid rgba(100, 116, 139, 0.1)',
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 16 }} />
            Trusted by 500+ cities worldwide | 40% average traffic reduction
            <TrafficIcon sx={{ fontSize: 16 }} />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;