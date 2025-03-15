import { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, ThemeProvider, createTheme, CssBaseline, Card, CardContent, Fade, Select, MenuItem, FormControl, InputLabel, Switch } from '@mui/material';
import { TrendingUp, TrendingDown, Favorite, Comment, Share, Visibility } from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a1929',
      paper: 'rgba(10, 25, 41, 0.8)'
    },
    primary: {
      main: '#90caf9'
    }
  },
  typography: {
    h3: {
      fontWeight: 600,
      background: 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '0.02em'
    },
    h6: {
      fontWeight: 500,
      color: '#90caf9'
    },
    h5: {
      fontWeight: 500,
      color: '#fff'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(10, 25, 41, 0.7), rgba(10, 25, 41, 0.9))',
          backdropFilter: 'blur(20px)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(144, 202, 249, 0.1) 0%, rgba(100, 181, 246, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(144, 202, 249, 0.2)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(144, 202, 249, 0.2)'
          }
        }
      }
    }
  }
});

const generateRandomData = (baseValue, variance, length) => {
  return Array.from({ length }, (_, i) => {
    const randomVariance = (Math.random() - 0.5) * variance;
    return Math.max(0, baseValue + randomVariance + i * (variance / 2));
  });
};

const mockData = {
  followers: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Twitter Followers',
        data: generateRandomData(1000, 200, 6),
        borderColor: '#1DA1F2',
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Instagram Followers',
        data: generateRandomData(2000, 300, 6),
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
    ],
  },
  engagement: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Twitter Engagement',
        data: generateRandomData(5, 2, 6),
        borderColor: '#1DA1F2',
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Instagram Engagement',
        data: generateRandomData(8, 2, 6),
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
    ],
  },
  interactions: {
    twitter: {
      likes: generateRandomData(500, 100, 6),
      comments: generateRandomData(200, 50, 6),
      shares: generateRandomData(150, 30, 6),
      views: generateRandomData(1000, 200, 6)
    },
    instagram: {
      likes: generateRandomData(800, 150, 6),
      comments: generateRandomData(300, 70, 6),
      shares: generateRandomData(200, 40, 6),
      views: generateRandomData(1500, 300, 6)
    }
  }
};

function SummaryCard({ title, value, trend, platform, color, icon: Icon, secondaryMetric, previousValue }) {
  const isPositive = trend > 0;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Fade in timeout={500}>
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            {Icon && <Icon sx={{ color, opacity: 0.8 }} />}
          </Box>
          <Typography variant="h5" sx={{ my: 1, color }}>
            {value.toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUp sx={{ color: '#4caf50' }} />
            ) : (
              <TrendingDown sx={{ color: '#f44336' }} />
            )}
            <Typography
              variant="body2"
              sx={{ color: isPositive ? '#4caf50' : '#f44336' }}
            >
              {Math.abs(trend)}% vs last period
            </Typography>
          </Box>
          {secondaryMetric && (
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1, 
                color: 'text.secondary',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                pt: 1 
              }}
            >
              {secondaryMetric}
            </Typography>
          )}
          <Fade in={showDetails}>
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                p: 1,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                transform: showDetails ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                Previous: {previousValue.toLocaleString()}
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                Change: {(value - previousValue).toLocaleString()}
              </Typography>
            </Box>
          </Fade>
        </CardContent>
      </Card>
    </Fade>
  );
}

function InteractionCard({ platform, data, color }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color }}>
          {platform} Interactions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Favorite sx={{ color: color }} />
              <Typography variant="body2">{data.likes[data.likes.length - 1].toLocaleString()} Likes</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Comment sx={{ color: color }} />
              <Typography variant="body2">{data.comments[data.comments.length - 1].toLocaleString()} Comments</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Share sx={{ color: color }} />
              <Typography variant="body2">{data.shares[data.shares.length - 1].toLocaleString()} Shares</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Visibility sx={{ color: color }} />
              <Typography variant="body2">{data.views[data.views.length - 1].toLocaleString()} Views</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function App() {
  const [data, setData] = useState(mockData);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1m');
  const [fadeIn, setFadeIn] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);

  const timeRanges = {
    '1m': 1,
    '3m': 3,
    '6m': 6,
    '1y': 12
  };

    const filterDataByTimeRange = (data, months) => {
    // If months is the full range, return all data
    if (months >= data.labels.length) {
      return data;
    }
    
    // Otherwise, slice the data to show only the last 'months' months
    const slicedLabels = data.labels.slice(-months);
    return {
      labels: slicedLabels,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(-months)
      }))
    };
  };

  const getFilteredData = () => {
    const timeRange = timeRanges[selectedTimeRange];
    if (comparisonMode) {
      return {
        followers: filterDataByTimeRange(mockData.followers, timeRange),
        engagement: filterDataByTimeRange(mockData.engagement, timeRange),
        interactions: mockData.interactions
      };
    }
    
    if (selectedPlatform === 'all') {
      return {
        followers: filterDataByTimeRange(mockData.followers, timeRange),
        engagement: filterDataByTimeRange(mockData.engagement, timeRange),
        interactions: mockData.interactions
      };
    }
    
    return {
      followers: {
        ...filterDataByTimeRange({
          labels: mockData.followers.labels,
          datasets: mockData.followers.datasets.filter(ds => ds.label.toLowerCase().includes(selectedPlatform))
        }, timeRange)
      },
      engagement: {
        ...filterDataByTimeRange({
          labels: mockData.engagement.labels,
          datasets: mockData.engagement.datasets.filter(ds => ds.label.toLowerCase().includes(selectedPlatform))
        }, timeRange)
      },
      interactions: {
        [selectedPlatform]: mockData.interactions[selectedPlatform]
      }
    };
  };
  
  const filteredData = getFilteredData();

  useEffect(() => {
    setFadeIn(true);
  }, [selectedPlatform, selectedTimeRange, comparisonMode]);

  const getGrowthRate = (data) => {
    if (data.length < 2) return 0;
    const oldValue = data[0];
    const newValue = data[data.length - 1];
    return ((newValue - oldValue) / oldValue) * 100;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        followers: {
          ...prevData.followers,
          datasets: prevData.followers.datasets.map(dataset => ({
            ...dataset,
            data: generateRandomData(
              dataset.data[dataset.data.length - 1],
              dataset.label.includes('Twitter') ? 200 : 300,
              6
            )
          }))
        },
        engagement: {
          ...prevData.engagement,
          datasets: prevData.engagement.datasets.map(dataset => ({
            ...dataset,
            data: generateRandomData(
              dataset.data[dataset.data.length - 1],
              2,
              6
            )
          }))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: 500
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(10, 25, 41, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(144, 202, 249, 0.2)',
        borderWidth: 1,
        padding: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a1929 0%, #1a2b3c 100%)'
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
            Social Media Dashboard
          </Typography>

          <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                label="Platform"
              >
                <MenuItem value="all">All Platforms</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="1m">Last Month</MenuItem>
                <MenuItem value="3m">Last 3 Months</MenuItem>
                <MenuItem value="6m">Last 6 Months</MenuItem>
                <MenuItem value="1y">Last Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Compare Platforms</Typography>
                <Switch
                  checked={comparisonMode}
                  onChange={(e) => setComparisonMode(e.target.checked)}
                  color="primary"
                />
              </Box>
            </FormControl>
          </Box>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard
                title="Twitter Followers"
                value={data.followers.datasets[0].data[5]}
                trend={5.2}
                platform="Twitter"
                color="#1DA1F2"
                icon={Visibility}
                previousValue={data.followers.datasets[0].data[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard
                title="Instagram Followers"
                value={data.followers.datasets[1].data[5]}
                trend={8.7}
                platform="Instagram"
                color="#E1306C"
                icon={Visibility}
                previousValue={data.followers.datasets[1].data[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard
                title="Twitter Engagement"
                value={data.engagement.datasets[0].data[5]}
                trend={3.5}
                platform="Twitter"
                color="#1DA1F2"
                icon={Favorite}
                previousValue={data.engagement.datasets[0].data[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard
                title="Instagram Engagement"
                value={data.engagement.datasets[1].data[5]}
                trend={6.2}
                platform="Instagram"
                color="#E1306C"
                icon={Favorite}
                previousValue={data.engagement.datasets[1].data[0]}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Follower Growth</Typography>
                <Line options={chartOptions} data={filteredData.followers} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Engagement Rate</Typography>
                <Line options={chartOptions} data={filteredData.engagement} />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {selectedPlatform === 'all' ? (
              <>
                <Grid item xs={12} md={6}>
                  <InteractionCard
                    platform="Twitter"
                    data={filteredData.interactions.twitter}
                    color="#1DA1F2"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InteractionCard
                    platform="Instagram"
                    data={filteredData.interactions.instagram}
                    color="#E1306C"
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <InteractionCard
                  platform={selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                  data={filteredData.interactions[selectedPlatform]}
                  color={selectedPlatform === 'twitter' ? '#1DA1F2' : '#E1306C'}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
