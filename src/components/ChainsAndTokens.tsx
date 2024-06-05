import React, {FC} from 'react';
import {Card, CardContent, ListSubheader, ListItemButton, Typography, ListItemText, List} from '@mui/material';
import {
    ChainDetailsWithTokens,
    TokenWithChainDetails
} from '@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model';

interface ChainsAndTokensProps {
    title: string;
    chains: ChainDetailsWithTokens[];
    selectedToken?: TokenWithChainDetails;
    handleSelectedTokenChange: (token: TokenWithChainDetails) => void
}

const ChainsAndTokens: FC<ChainsAndTokensProps> = ({title, chains, selectedToken, handleSelectedTokenChange}) => {

    const getTokenKey = (token: TokenWithChainDetails): string => {
        return token.chainSymbol + '_' + token.symbol;
    }

    const isTokenSelected = (token: TokenWithChainDetails): boolean => {
        if (!selectedToken) {
            return false;
        }
        return getTokenKey(token) === getTokenKey(selectedToken)
    }

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <List
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': {padding: 0},
                    }}
                    subheader={<li/>}
                >
                    {chains.map((chain) => (
                        <li key={`section-${chain.chainSymbol}`}>
                            <ul>
                                <ListSubheader color="primary">{chain.name}</ListSubheader>
                                {chain.tokens.map((token) => (
                                    <ListItemButton key={token.name} selected={isTokenSelected(token)}
                                                    onClick={() => handleSelectedTokenChange(token)}>
                                        <ListItemText primary={token.name}/>
                                    </ListItemButton>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default ChainsAndTokens;
