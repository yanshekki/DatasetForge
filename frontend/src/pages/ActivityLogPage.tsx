import React from 'react';
import ActivityHeatmap from '../components/ActivityHeatmap';

// ... existing code ...

export default function ActivityLogPage({ showError }: { showError: (msg: string) => void }) {
  return (
    <Box p={3}>
      {/* ... existing activity log content ... */}

      <Box mt={4}>
        <ActivityHeatmap showError={showError} />
      </Box>
    </Box>
  );
}
