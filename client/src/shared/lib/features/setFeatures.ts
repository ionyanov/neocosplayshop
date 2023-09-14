import type { FeatureFlag } from '@/shared/types/featureFlag';

let featureFlags: FeatureFlag;

export function setFeatures(newFeature?: FeatureFlag): void {
    if (newFeature) {
        featureFlags = newFeature;
    }
}

export function getFeatures(flag: keyof FeatureFlag): boolean {
    return featureFlags[flag] ?? false;
}
