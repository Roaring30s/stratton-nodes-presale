import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearTimer(props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(() => {
                if (progress === 100) {
                    return 0;
                } else {
                    setProgress(progress++);
                }
            });
        }, props.time);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                color={props.color}
            />
        </Box>
    );
}