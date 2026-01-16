import { AlgorandWalletProvider } from './models';
import { ChainSymbol, ChainType, RawAlgTransaction } from '@allbridge/bridge-core-sdk';
import { PeraWalletConnect } from '@perawallet/connect';
import { Algodv2, decodeUnsignedTransaction, Transaction, TransactionType, waitForConfirmation } from 'algosdk';

class AlgorandWallet implements AlgorandWalletProvider {
    chainType = ChainType.ALG as const;
    chainSymbol = ChainSymbol.ALG;
    algod = new Algodv2('', 'https://mainnet-api.4160.nodely.dev', '');
    private _peraWallet = new PeraWalletConnect({ chainId: 416001 });

    async connect(): Promise<string | undefined> {
        let address = undefined;
        try {
            const addresses = await this._peraWallet.connect();
            address = addresses?.[0] ?? null;
        } catch (e: any) {
            const message = e?.message || e;
            if (message.includes('Session currently connected')) {
                address = await this._reconnect();
            }
        }
        return address;
    }

    async signAndSendTransaction(rawTransaction: RawAlgTransaction): Promise<string> {
        const txns = rawTransactionToTransactions(rawTransaction);
        if (txns.length === 0) {
            throw new Error('No transactions to sign');
        }
        const peraTxns = txns.map(txn => ({
            txn: txn,
            signers: [],
        }));
        const signed = await this._peraWallet.signTransaction([peraTxns]);
        const transactions = rawTransactionToTransactions(rawTransaction);
        const txId =
            transactions.find(txn => txn.type === TransactionType.appl)?.txID() ||
            transactions[0].txID();
        if (!txId) {
            throw new Error('Failed getting txId');
        }
        await this.algod.sendRawTransaction(ensureSignedTxs(signed)).do();
        await waitForConfirmation(this.algod, txId, 4);
        return txId;
    }

    disconnect = () => {
        this._peraWallet.disconnect();
    }

    private async _reconnect(): Promise<string | undefined> {
        const addresses = await this._peraWallet.reconnectSession();
        return addresses?.[0] ?? undefined;
    }
}

export default AlgorandWallet;

export function rawTransactionToTransactions(
    rawTransaction: string[]
): Transaction[] {
    return rawTransaction.map(tx => {
        const bytes = Buffer.from(tx, 'hex');
        return decodeUnsignedTransaction(bytes);
    });
}

export function ensureSignedTxs(arr: (Uint8Array | null)[]): Uint8Array[] {
    if (arr.some((item): item is null => item === null)) {
        throw new Error('Failed signing transaction');
    }
    return arr as Uint8Array[];
}
