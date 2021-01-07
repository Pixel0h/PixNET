import HomeIcon from '@material-ui/icons/Home';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import React from 'react';

export function Navigation() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className="navigation">
            <BottomNavigationAction label="" value="" icon={<HomeIcon />} />
            <BottomNavigationAction label="" value="" icon={<HomeIcon />} />
            <BottomNavigationAction label="" value="" icon={<HomeIcon />} />
        </BottomNavigation>
    )
}