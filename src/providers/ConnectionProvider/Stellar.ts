import {StellarWalletProvider} from './models';
import {
    signTransaction,
    getNetworkDetails,
    getPublicKey,
    requestAccess
} from '@stellar/freighter-api';
import {sdk} from '../../services/sdk';
import {ChainSymbol, ChainType, RawSorobanTransaction} from '@allbridge/bridge-core-sdk';

class StellarWallet implements StellarWalletProvider {
    chainType = ChainType.SRB as const;
    chainSymbol = ChainSymbol.SRB;

    async connect(): Promise<string | undefined> {
        await requestAccess();
        return await getPublicKey();
    }

    async signAndSendTransaction(rawTransaction: RawSorobanTransaction): Promise<string> {
        const { networkPassphrase, networkUrl } = await getNetworkDetails();
        const signedXdr = await signTransaction(rawTransaction, {
            network: networkUrl,
            networkPassphrase: networkPassphrase,
        });
        const txRes = await sdk.utils.srb.sendTransactionSoroban(signedXdr);
        if (txRes.status !== 'PENDING') {
            throw new Error('Failed transaction');
        }
        return txRes.hash;
    }
}

export default StellarWallet;
