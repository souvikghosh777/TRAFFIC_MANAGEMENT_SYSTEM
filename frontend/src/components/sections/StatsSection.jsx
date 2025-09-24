import React, { useState, useEffect, useRef } from 'react';
import '../../styles/StatsSection.css';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';

const stats = [
  { number: 40, suffix: '%', description: 'Reduction in Traffic Congestion' },
  { number: 25, suffix: '%', description: 'Decrease in Travel Time' },
  { number: 60, suffix: '%', description: 'Improvement in Fuel Efficiency' },
  { number: 99.9, suffix: '%', description: 'System Uptime Reliability' },
];

const AnimatedCounter = ({ finalNumber, suffix, description, shouldAnimate }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime;
    const duration = 2000; // 2 seconds
    const startValue = 0;
    const endValue = finalNumber;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setCurrentNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentNumber(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [finalNumber, shouldAnimate]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: { xs: '1rem', md: '2rem 1rem' },
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
          lineHeight: 1.1,
        }}
      >
        {Math.floor(currentNumber * 10) / 10}{suffix}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: { xs: '0.875rem', md: '1rem' },
          lineHeight: 1.4,
          maxWidth: 200,
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 8,
        background: 'rgba(15, 23, 42, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.description}>
              <Box data-aos="fade-up" data-aos-delay={index * 100}>
                <AnimatedCounter
                  finalNumber={stat.number}
                  suffix={stat.suffix}
                  description={stat.description}
                  shouldAnimate={isVisible}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;