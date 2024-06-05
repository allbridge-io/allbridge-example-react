import React, {FC, useContext} from 'react';
import {Button, Card, CardContent, Grid, Stack, TextField, Typography} from '@mui/material';
import {ConnectionContext} from '../providers/ConnectionProvider/ConnectionProvider';
import {TokenWithChainDetails} from '@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model';

interface AccountsProps {
    selectedSourceToken?: TokenWithChainDetails;
    destinationAccount?: string;
    handleChangeDestinationAccount: (account?: string) => void
}

const Accounts: FC<AccountsProps> = ({selectedSourceToken, destinationAccount, handleChangeDestinationAccount}) => {
    const {account, connect, disconnect} = useContext(ConnectionContext);
    const handleConnect = async (): Promise<void> => {
        if (selectedSourceToken) {
            await connect(selectedSourceToken?.chainSymbol)
        }
    }
    return <Card>
        <CardContent>
            <Stack direction="row" spacing={2} sx={{mb: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                    Accounts
                </Typography>
                {account ? <Button onClick={disconnect} variant="text">Disconnect</Button> : <Button onClick={handleConnect} variant="text">Connect</Button>}
            </Stack>

            <Grid container columnSpacing={6} rowGap={2} rowSpacing={0}>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" disabled={true} value={account || ''} label="Source account" fullWidth={true} variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" value={destinationAccount || ''} onChange={e => handleChangeDestinationAccount(e.target.value)} label="Destination account" fullWidth={true} variant="outlined" />
                </Grid>
            </Grid>
        </CardContent>

    </Card>
}

export default Accounts;
