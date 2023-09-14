import type { ReactElement } from 'react';
import type { FeatureFlag } from '@/shared/types/featureFlag';
import { getFeatures } from './setFeatures';

interface ToggleFeaturesCompProps {
    feature: keyof FeatureFlag;
    on: ReactElement;
    off: ReactElement;
}

export function ToggleFeaturesComp(
    props: ToggleFeaturesCompProps,
): ReactElement {
    if (getFeatures(props.feature)) {
        return props.on;
    }
    return props.off;
}
