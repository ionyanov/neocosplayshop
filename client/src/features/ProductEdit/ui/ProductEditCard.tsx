import { FC } from 'react';
import { Container, Grid } from '@mui/material';
import { ProductAdminDescription } from '@/entities/ProductAdminDescription';
import { PAPropertiesTable } from '@/entities/ProductAdminProperty/ui/PAPropertiesTable';

interface ProductEditCardProps {
    id: number;
}

export const ProductEditCard: FC<ProductEditCardProps> = (args) => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    ImageCard
                </Grid>
                <Grid item xs={8}>
                    <PAPropertiesTable id={args.id} />
                    <ProductAdminDescription id={args.id} />
                </Grid>
            </Grid>
        </Container>
    );
};
