import React, {FC} from 'react';
import {Card, CardContent, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';

interface FeePaymentMethodSelectorProps {
    amount: string;
    handleChangeAmount: (amount: string) => void
}

const AmountSelector: FC<FeePaymentMethodSelectorProps> = ({amount, handleChangeAmount}) => {
    return <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">Amount</Typography>
            <ToggleButtonGroup
                color="primary"
                value={amount}
                exclusive
                onChange={(event, value) => handleChangeAmount(value)}
                aria-label="Platform"
            >
                <ToggleButton value="0.1">0.1$</ToggleButton>
                <ToggleButton value="1">1.00$</ToggleButton>
                <ToggleButton value="10">10.00$</ToggleButton>
            </ToggleButtonGroup>
        </CardContent>
    </Card>
}

export default AmountSelector;
