import { PermissionService } from '../permission.service';

describe('PermissionService', () => {
  let permissionService: PermissionService;

  beforeEach(() => {
    permissionService = new PermissionService();
  });

  it('should return false for invalid dataset access', async () => {
    const result = await permissionService.canAccessDataset(999999, 999999);
    expect(result).toBe(false);
  });
});
