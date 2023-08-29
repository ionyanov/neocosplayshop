import type { FeatureFlag } from '@/shared/types/featureFlag';
import { getFeatures } from './setFeatures';

interface ToggleFeaturesProps<T> {
    name: keyof FeatureFlag;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>(props: ToggleFeaturesProps<T>): T {
    if (getFeatures(props.name)) {
        return props.on();
    }
    return props.off();
}
