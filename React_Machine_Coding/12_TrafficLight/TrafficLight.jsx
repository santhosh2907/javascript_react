import React, { useState } from 'react';

const TrafficLight = () => {
    const [color, setColor] = useState('red');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (color === 'red') setColor('green');
            else if (color === 'green') setColor('yellow');
            else if (color === 'yellow') setColor('red');
        }, color === 'yellow' ? 1000 : 3000);
        return () => clearTimeout(timer);
    }, [color]);

    const lightStyle = (lightColor) => ({
        width: '40px', height: '40px', borderRadius: '50%',
        background: color === lightColor ? lightColor : 'gray',
        margin: '5px auto'
    });

    return (
        <div style={{ background: '#222', padding: '10px', width: '60px', borderRadius: '10px' }}>
            <div style={lightStyle('red')} />
            <div style={lightStyle('yellow')} />
            <div style={lightStyle('green')} />
        </div>
    );
};
export default TrafficLight;
