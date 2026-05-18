import React, { useState } from 'react';
import VersionComparisonDialog from '../components/VersionComparisonDialog';

// ... existing code ...

export default function DatasetDetailPage({ showError }: { showError: (msg: string) => void }) {
  const { id } = useParams<{ id: string }>(); 
  const datasetId = parseInt(id || '0');
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  // ... existing code ...

  return (
    <Box p={3}>
      {/* ... existing dataset details ... */}

      <Button variant="outlined" onClick={() => setCompareDialogOpen(true)}>
        Compare Versions
      </Button>

      <VersionComparisonDialog
        open={compareDialogOpen}
        onClose={() => setCompareDialogOpen(false)}
        datasetId={datasetId}
        versions={dataset.versions || []}
        showError={showError}
      />

      {/* ... existing content ... */}
    </Box>
  );
}
