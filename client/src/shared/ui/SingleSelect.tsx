import { Autocomplete, TextField } from '@mui/material';

interface MultiSelectorProp<T> {
    allValues: T[];
    selectedValues: T;
    getLabel: (option: T) => string;
    comparer?: (option: string | T, value: string | T) => boolean;
    onSelectValue?: (option: T | undefined) => void;
    onDeleteValue?: (option: T | undefined) => void;
}

export function SingleSelector<T>(args: MultiSelectorProp<T>) {
    return (
        <Autocomplete
            options={args.allValues}
            getOptionLabel={args.getLabel}
            value={args.selectedValues}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, newValue, reason, details) => {
                if (args.onSelectValue) args.onSelectValue(details?.option);
            }}
            isOptionEqualToValue={args.comparer}
        />
    );
}
