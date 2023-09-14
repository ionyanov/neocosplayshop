import React, { FC } from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { BorderColor, BorderedImage } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { getRouteProductDetail } from '@/shared/const/router';
import { Product } from '../model/types/Product';

interface ProductMiniCardProps {
    content: Product;
    variant?: BorderColor;
    width?: number;
    height?: number;
    border?: number;
}

export const ProductMiniCard: FC<ProductMiniCardProps> = (props) => {
    const {
        width = 300,
        height = 300,
    } = props;

    return (
        <Card sx={{
            width: width,
            background: 'transparent',
            boxShadow: 'none',
        }}

        >
            <CardActionArea component={Link} to={getRouteProductDetail(props.content.id.toString())}>
                <BorderedImage border={props.border}
                               content={props.content.mainimage}
                               variant={props.variant}
                               height={height}
                               width={width}
                               title={props.content.name} />
                <CardContent>
                    <Typography align={'center'} variant={'h3'}>{props.content.name}</Typography>
                    <Typography align={'center'} variant={'h4'}>{`${props.content.price}$`}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
        ;
};