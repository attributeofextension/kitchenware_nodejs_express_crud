import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    AccountCircle as AccountCircleIcon,
    Inventory as InventoryIcon
} from '@mui/icons-material';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard.tsx';
import Settings from "./pages/Settings.tsx";
import Products from "./pages/Products.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { AppStateProvider} from "./contexts/AppStateProvider.tsx";


const drawerWidth = 240;

function Layout() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />

            {/* App Bar - Full Width */}
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Some <del>Kitchenware</del> CRUD App
                    </Typography>

                    {/* Profile Menu */}
                    <IconButton
                        size="large"
                        edge="end"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Content Area */}
            <Box sx={{ display: 'flex', marginTop: '64px' }}> {/* 64px is the height of the AppBar */}
                {/* Side Navigation */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            position: 'relative',
                            height: `calc(100vh - 64px)`,
                        },
                    }}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={location.pathname === "/"}
                                onClick={() => navigate("/")}
                            >
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={location.pathname === "/products"}
                                onClick={() => navigate("/products")}
                            >
                                <ListItemIcon>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={location.pathname === "/settings"}
                                onClick={() => navigate("/settings")}
                            >
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppStateProvider>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </AppStateProvider>
        </ThemeProvider>
    );
}


export default App;