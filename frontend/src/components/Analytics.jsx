import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  Traffic as TrafficIcon,
  DirectionsCar as CarIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import '../styles/Analytics.css';

const Analytics = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalIntersections: 42,
      avgWaitTime: 28.5,
      trafficFlow: 87.2,
      systemEfficiency: 94.8,
      improvementRate: 12.3,
    },
    hourlyData: [
      { hour: '06:00', flow: 45, waitTime: 32, vehicles: 1240 },
      { hour: '07:00', flow: 72, waitTime: 45, vehicles: 2180 },
      { hour: '08:00', flow: 89, waitTime: 38, vehicles: 2890 },
      { hour: '09:00', flow: 65, waitTime: 29, vehicles: 2100 },
      { hour: '10:00', flow: 58, waitTime: 25, vehicles: 1850 },
      { hour: '11:00', flow: 62, waitTime: 27, vehicles: 1980 },
      { hour: '12:00', flow: 78, waitTime: 35, vehicles: 2450 },
    ],
    topPerformers: [
      { intersection: 'Main St & 1st Ave', efficiency: 96.8, trend: 'up' },
      { intersection: 'Broadway & Central', efficiency: 94.2, trend: 'up' },
      { intersection: 'Oak St & Pine Ave', efficiency: 91.7, trend: 'down' },
      { intersection: 'Highway 101 & Exit 15', efficiency: 89.3, trend: 'up' },
    ],
    issues: [
      { location: 'Elm St & 3rd Ave', issue: 'Sensor Malfunction', severity: 'high', eta: '15 min' },
      { location: 'River Rd & Bridge St', issue: 'Heavy Congestion', severity: 'medium', eta: '30 min' },
      { location: 'Park Ave & Main St', issue: 'Signal Timing Optimization', severity: 'low', eta: '2 hr' },
    ]
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setAnalyticsData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          avgWaitTime: prev.overview.avgWaitTime + (Math.random() - 0.5) * 5,
          trafficFlow: prev.overview.trafficFlow + (Math.random() - 0.5) * 10,
          systemEfficiency: Math.min(100, prev.overview.systemEfficiency + (Math.random() - 0.5) * 3),
        }
      }));
      setLoading(false);
    }, 1000);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `traffic-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getPerformanceColor = (value) => {
    if (value >= 90) return '#4caf50';
    if (value >= 75) return '#ff9800';
    return '#f44336';
  };

  if (loading) {
    return (
      <Box className="analytics-loading">
        <AssessmentIcon className="loading-icon" />
        <Typography variant="h5">Loading Analytics...</Typography>
        <Typography variant="body2" color="textSecondary">
          Gathering traffic data and performance metrics
        </Typography>
        <LinearProgress sx={{ mt: 2, width: '300px' }} />
      </Box>
    );
  }

  return (
    <Box className="analytics-container">
      <Container maxWidth="xl">
        {/* Header */}
        <Box className="analytics-header">
          <Box className="header-content">
            <AssessmentIcon className="header-icon" />
            <Box>
              <Typography variant="h4" className="header-title">
                Traffic Analytics Dashboard
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Real-time insights and performance metrics for traffic management
              </Typography>
            </Box>
          </Box>
          <Box className="header-actions">
            <IconButton onClick={refreshData} className="refresh-btn">
              <RefreshIcon />
            </IconButton>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              onClick={exportData}
              className="export-btn"
            >
              Export Data
            </Button>
          </Box>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} className="overview-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="metric-card">
              <CardContent>
                <Box className="metric-header">
                  <TrafficIcon className="metric-icon traffic-icon" />
                  <Typography variant="h6">Active Intersections</Typography>
                </Box>
                <Typography variant="h3" className="metric-value">
                  {analyticsData.overview.totalIntersections}
                </Typography>
                <Chip 
                  label="All Online" 
                  color="success" 
                  size="small" 
                  className="metric-chip"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="metric-card">
              <CardContent>
                <Box className="metric-header">
                  <TimeIcon className="metric-icon time-icon" />
                  <Typography variant="h6">Avg Wait Time</Typography>
                </Box>
                <Typography variant="h3" className="metric-value">
                  {analyticsData.overview.avgWaitTime.toFixed(1)}s
                </Typography>
                <Chip 
                  label={`${analyticsData.overview.improvementRate > 0 ? '-' : '+'}${Math.abs(analyticsData.overview.improvementRate).toFixed(1)}%`}
                  color={analyticsData.overview.improvementRate > 0 ? "success" : "error"}
                  size="small" 
                  className="metric-chip"
                  icon={analyticsData.overview.improvementRate > 0 ? <TrendingDownIcon /> : <TrendingUpIcon />}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="metric-card">
              <CardContent>
                <Box className="metric-header">
                  <SpeedIcon className="metric-icon speed-icon" />
                  <Typography variant="h6">Traffic Flow</Typography>
                </Box>
                <Typography variant="h3" className="metric-value">
                  {analyticsData.overview.trafficFlow.toFixed(1)}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={analyticsData.overview.trafficFlow} 
                  className="metric-progress"
                  sx={{ 
                    '& .MuiLinearProgress-bar': { 
                      backgroundColor: getPerformanceColor(analyticsData.overview.trafficFlow) 
                    } 
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="metric-card">
              <CardContent>
                <Box className="metric-header">
                  <TimelineIcon className="metric-icon efficiency-icon" />
                  <Typography variant="h6">System Efficiency</Typography>
                </Box>
                <Typography variant="h3" className="metric-value">
                  {analyticsData.overview.systemEfficiency.toFixed(1)}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={analyticsData.overview.systemEfficiency} 
                  className="metric-progress"
                  sx={{ 
                    '& .MuiLinearProgress-bar': { 
                      backgroundColor: getPerformanceColor(analyticsData.overview.systemEfficiency) 
                    } 
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} className="content-grid">
          {/* Hourly Performance Table */}
          <Grid item xs={12} lg={7}>
            <Card className="data-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Hourly Performance Data
                </Typography>
                <TableContainer component={Paper} className="data-table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Traffic Flow (%)</TableCell>
                        <TableCell>Wait Time (s)</TableCell>
                        <TableCell>Vehicles/Hr</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.hourlyData.map((row) => (
                        <TableRow key={row.hour} className="table-row">
                          <TableCell>{row.hour}</TableCell>
                          <TableCell>
                            <Box className="flow-cell">
                              {row.flow}%
                              <LinearProgress 
                                variant="determinate" 
                                value={row.flow} 
                                size="small"
                                sx={{ 
                                  ml: 1, 
                                  width: '60px',
                                  '& .MuiLinearProgress-bar': { 
                                    backgroundColor: getPerformanceColor(row.flow) 
                                  } 
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{row.waitTime}</TableCell>
                          <TableCell>{row.vehicles.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Performers & Issues */}
          <Grid item xs={12} lg={5}>
            <Box className="side-content">
              {/* Top Performers */}
              <Card className="data-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Top Performing Intersections
                  </Typography>
                  <Box className="performers-list">
                    {analyticsData.topPerformers.map((performer, index) => (
                      <Box key={index} className="performer-item">
                        <Box className="performer-info">
                          <Typography variant="body1" className="performer-name">
                            {performer.intersection}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {performer.efficiency}% efficiency
                          </Typography>
                        </Box>
                        <Box className="performer-trend">
                          {performer.trend === 'up' ? (
                            <TrendingUpIcon className="trend-up" />
                          ) : (
                            <TrendingDownIcon className="trend-down" />
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Active Issues */}
              <Card className="data-card issues-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Active Issues
                  </Typography>
                  <Box className="issues-list">
                    {analyticsData.issues.map((issue, index) => (
                      <Box key={index} className="issue-item">
                        <Box className="issue-info">
                          <Typography variant="body1" className="issue-location">
                            {issue.location}
                          </Typography>
                          <Typography variant="body2" className="issue-description">
                            {issue.issue}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ETA: {issue.eta}
                          </Typography>
                        </Box>
                        <Chip 
                          label={issue.severity.toUpperCase()}
                          color={getSeverityColor(issue.severity)}
                          size="small"
                          className="issue-severity"
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Analytics;