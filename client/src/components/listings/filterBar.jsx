import { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { 
  Whatshot, Hotel, LocationCity, Terrain, 
  Castle, Pool, Cabin, Agriculture, 
  AcUnit, Home, DirectionsBoat 
} from '@mui/icons-material';

const filters = [
  { id: 'trending', icon: Whatshot, label: 'Trending' },
  { id: 'rooms', icon: Hotel, label: 'Rooms' },
  { id: 'cities', icon: LocationCity, label: 'Iconic Cities' },
  { id: 'mountains', icon: Terrain, label: 'Mountains' },
  { id: 'castles', icon: Castle, label: 'Castles' },
  { id: 'pools', icon: Pool, label: 'Amazing Pools' },
  { id: 'camping', icon: Cabin, label: 'Camping' },
  { id: 'farms', icon: Agriculture, label: 'Farms' },
  { id: 'arctic', icon: AcUnit, label: 'Arctic' },
  { id: 'domes', icon: Home, label: 'Domes' },
  { id: 'boats', icon: DirectionsBoat, label: 'Boats' },
];

const FilterBar = ({ onFilterChange, onTaxToggle, activeFilter }) => {
  const [showTax, setShowTax] = useState(false);

  const handleFilterClick = (filterId) => {
    const newFilter = activeFilter === filterId ? null : filterId;
    onFilterChange(newFilter);
  };

  const handleTaxToggle = (e) => {
    const checked = e.target.checked;
    setShowTax(checked);
    onTaxToggle(checked);
  };

  return (
    <Box sx={{ 
      borderBottom: '1px solid #ddd', 
      py: 2, 
      px: 3,
      bgcolor: 'white',
      position: 'sticky',
      top: 64,
      zIndex: 100
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 3,
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        pb: 1
      }}>
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <Box
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 70,
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.6,
                transition: 'all 0.2s',
                '&:hover': { opacity: 1 },
                borderBottom: isActive ? '2px solid black' : 'none',
                pb: 1
              }}
            >
              <Icon sx={{ fontSize: 24, mb: 0.5 }} />
              <Typography variant="caption" sx={{ fontSize: '0.75rem', textAlign: 'center' }}>
                {filter.label}
              </Typography>
            </Box>
          );
        })}
        
        {/* Tax Toggle */}
        <Box sx={{ 
          ml: 'auto', 
          border: '1px solid #ddd', 
          borderRadius: 25, 
          px: 2, 
          py: 0.5,
          minWidth: 'fit-content'
        }}>
          <FormControlLabel
            control={
              <Switch 
                checked={showTax} 
                onChange={handleTaxToggle}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                Display total after taxes
              </Typography>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBar;