import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  Fade,
  Grow,
} from '@mui/material';
import {
  TrafficRounded as TrafficIcon,
  SpeedRounded as SpeedIcon,
  TrendingUpRounded as TrendingUpIcon,
  TrendingDownRounded as TrendingDownIcon,
  NotificationsActive as AlertIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  BarElement
);

const DashboardCard = ({ title, children, action, loading = false, ...props }) => {
  const theme = useTheme();
  
  return (
    <Fade in timeout={600}>
      <Card
        sx={{
          height: '100%',
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 41, 59, 0.6)' 
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(100, 116, 139, 0.2)' : 'rgba(203, 213, 225, 0.3)'}`,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
          },
          ...props.sx,
        }}
      >
        {loading && <LinearProgress />}
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {title}
            </Typography>
            {action}
          </Box>
          {children}
        </CardContent>
      </Card>
    </Fade>
  );
};

const MetricCard = ({ icon, title, value, change, color = 'primary' }) => {
  const theme = useTheme();
  const isPositive = change > 0;
  
  return (
    <Grow in timeout={400}>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${theme.palette[color].main}15, ${theme.palette[color].main}05)`,
          border: `1px solid ${theme.palette[color].main}30`,
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: `0 8px 32px ${theme.palette[color].main}20`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isPositive ? (
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                )}
                <Typography
                  variant="caption"
                  sx={{ 
                    color: isPositive ? 'success.main' : 'error.main',
                    fontWeight: 600,
                  }}
                >
                  {Math.abs(change)}%
                </Typography>
              </Box>
            </Box>
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
                width: 56,
                height: 56,
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

const StatusChip = ({ status, label }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckIcon sx={{ fontSize: 16 }} />;
      case 'warning': return <WarningIcon sx={{ fontSize: 16 }} />;
      case 'error': return <ErrorIcon sx={{ fontSize: 16 }} />;
      default: return null;
    }
  };

  return (
    <Chip
      icon={getStatusIcon(status)}
      label={label}
      color={getStatusColor(status)}
      variant="filled"
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default function ProfessionalDashboard() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Sample data - replace with real API calls
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      activeIntersections: { value: 24, change: 5.2 },
      avgWaitTime: { value: '2.4min', change: -12.5 },
      trafficFlow: { value: '1,247', change: 8.3 },
      efficiency: { value: '94%', change: 2.1 },
    },
    intersections: [
      { id: 1, name: 'Main St & 1st Ave', status: 'active', flow: 85, waitTime: '1.2min' },
      { id: 2, name: 'Broadway & 2nd St', status: 'warning', flow: 92, waitTime: '3.1min' },
      { id: 3, name: 'Park Ave & 3rd St', status: 'active', flow: 78, waitTime: '2.0min' },
      { id: 4, name: 'Oak St & Main Ave', status: 'error', flow: 45, waitTime: '5.8min' },
    ],
    alerts: [
      { id: 1, type: 'warning', message: 'High congestion detected at Broadway & 2nd St', time: '2 min ago' },
      { id: 2, type: 'info', message: 'Emergency vehicle routing activated', time: '5 min ago' },
      { id: 3, type: 'success', message: 'Traffic optimization completed successfully', time: '10 min ago' },
    ],
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Chart configurations
  const trafficFlowData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Traffic Flow',
        data: [300, 150, 800, 1200, 1400, 900],
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const efficiencyData = {
    labels: ['Optimized', 'Standard', 'Congested'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme.palette.text.secondary },
      },
      y: {
        grid: { color: theme.palette.divider },
        ticks: { color: theme.palette.text.secondary },
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Traffic Control Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time monitoring and control of smart traffic management system
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} disabled={refreshing}>
              <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleMenuClick}>
            <MoreIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Export Data
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<TrafficIcon />}
            title="Active Intersections"
            value={dashboardData.metrics.activeIntersections.value}
            change={dashboardData.metrics.activeIntersections.change}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<SpeedIcon />}
            title="Avg Wait Time"
            value={dashboardData.metrics.avgWaitTime.value}
            change={dashboardData.metrics.avgWaitTime.change}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<TrendingUpIcon />}
            title="Traffic Flow"
            value={dashboardData.metrics.trafficFlow.value}
            change={dashboardData.metrics.trafficFlow.change}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<CheckIcon />}
            title="System Efficiency"
            value={dashboardData.metrics.efficiency.value}
            change={dashboardData.metrics.efficiency.change}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts and Data */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <DashboardCard title="Traffic Flow Analysis" loading={refreshing}>
            <Box sx={{ height: 300 }}>
              <Line data={trafficFlowData} options={chartOptions} />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="System Efficiency">
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Doughnut data={efficiencyData} options={{ maintainAspectRatio: false }} />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Intersection Status and Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <DashboardCard title="Intersection Status">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {dashboardData.intersections.map((intersection) => (
                <Paper
                  key={intersection.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {intersection.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Flow: {intersection.flow}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Wait: {intersection.waitTime}
                        </Typography>
                      </Box>
                    </Box>
                    <StatusChip status={intersection.status} label={intersection.status.toUpperCase()} />
                  </Box>
                </Paper>
              ))}
            </Box>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <DashboardCard title="Recent Alerts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {dashboardData.alerts.map((alert) => (
                <Box
                  key={alert.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette[alert.type === 'info' ? 'primary' : alert.type].main}20`,
                    backgroundColor: `${theme.palette[alert.type === 'info' ? 'primary' : alert.type].main}08`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <AlertIcon 
                      sx={{ 
                        color: theme.palette[alert.type === 'info' ? 'primary' : alert.type].main,
                        fontSize: 18,
                        mt: 0.2,
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
}