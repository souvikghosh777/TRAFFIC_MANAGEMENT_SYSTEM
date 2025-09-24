import React from 'react';
import '../../styles/ContactSection.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Support as SupportIcon,
  LocationCity as LocationCityIcon,
  Dashboard as DashboardIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const contactInfo = [
  {
    icon: <BusinessIcon />,
    title: 'Sales & Partnerships',
    details: [
      '📧 sales@smarttraffic.ai',
      '📱 +1 (555) 123-4567',
      '🌐 Schedule a demo call'
    ],
    color: 'primary.main',
  },
  {
    icon: <SupportIcon />,
    title: 'Technical Support',
    details: [
      '📧 support@smarttraffic.ai',
      '📱 +1 (555) 123-4568',
      '🕒 24/7 Emergency Support'
    ],
    color: 'secondary.main',
  },
  {
    icon: <LocationCityIcon />,
    title: 'Headquarters',
    details: [
      '📍 Smart City Innovation Hub',
      '🏢 123 Technology Drive',
      '🌆 Silicon Valley, CA 94105'
    ],
    color: 'warning.main',
  },
];

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        background: 'rgba(30, 41, 59, 1)',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }} data-aos="fade-up">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Ready to revolutionize your city's traffic management? Contact our team of experts
            to discuss how SmartTraffic can be customized for your specific needs.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((contact, index) => (
            <Grid item xs={12} md={4} key={contact.title}>
              <Card
                data-aos="fade-up"
                data-aos-delay={index * 100}
                sx={{
                  height: '100%',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: contact.color,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 600,
                    }}
                  >
                    {contact.icon}
                    {contact.title}
                  </Typography>
                  {contact.details.map((detail, idx) => (
                    <Typography
                      key={idx}
                      sx={{
                        color: 'text.secondary',
                        mb: idx < contact.details.length - 1 ? 1 : 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {detail}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}
          data-aos="fade-up"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<DashboardIcon />}
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
            Access Dashboard
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            component="a"
            href="mailto:sales@smarttraffic.ai"
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
            Send Email
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactSection;