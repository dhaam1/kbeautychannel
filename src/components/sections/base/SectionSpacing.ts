export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface SpacingConfig {
  mobile?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  tablet?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  desktop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export function getSpacingStyles(
  spacing: SpacingConfig | undefined,
  deviceType: DeviceType
): React.CSSProperties {
  if (!spacing) {
    return {};
  }

  const deviceSpacing = spacing[deviceType] || spacing.mobile || {};

  return {
    paddingTop: deviceSpacing.top !== undefined ? `${deviceSpacing.top}px` : undefined,
    paddingBottom: deviceSpacing.bottom !== undefined ? `${deviceSpacing.bottom}px` : undefined,
    paddingLeft: deviceSpacing.left !== undefined ? `${deviceSpacing.left}px` : undefined,
    paddingRight: deviceSpacing.right !== undefined ? `${deviceSpacing.right}px` : undefined,
  };
}
