import { FormControlLabel, Checkbox, Typography, Box } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                }
                label="Dark mode"
            />
        </Box>

    );
}