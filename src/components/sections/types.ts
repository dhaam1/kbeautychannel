import type { DeviceType } from './base/SectionSpacing';
import type { SpacingConfig } from './base/SectionSpacing';

export interface ContentItem {
  title?: string | string[];
  subtitle?: string | string[];
  description?: string | string[];
  [key: string]: any;
}

export interface HeroSectionContent {
  mobile?: ContentItem;
  tablet?: ContentItem;
  desktop?: ContentItem;
  default?: ContentItem;
}

export interface HeroSectionProps {
  content?: HeroSectionContent;
  spacing?: SpacingConfig;
  backgroundColor?: string;
  backgroundImage?: string;
}
