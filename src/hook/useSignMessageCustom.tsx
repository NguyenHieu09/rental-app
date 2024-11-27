import { useAccount, useConnect, useDisconnect, useSignMessage, Connector } from 'wagmi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-toolkit/store';

export const useSignMessageCustom = () => {
    const { signMessageAsync } = useSignMessage();
    const { connectAsync, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { address } = useAccount();
    const user = useSelector((state: RootState) => state.user.user);

    const handleSign = async ({ message }: { message: string }) => {
        const connector: Connector = connectors[0];

        let add = address;

        if (address !== user?.walletAddress) {
            await disconnectAsync();
            const res = await connectAsync({ connector });

            if (res) add = res.accounts?.[0] || '';
        }
        // if (address !== user?.walletAddress) {
        //     console.log("user?.walletAddress", user?.walletAddress);
        //     console.log("address", address);

        //     await disconnectAsync({
        //         connector,
        //     });

        //     console.log("disconnect");

        //     await connectAsync({ connector });

        //     console.log("connectAsync");
        // }

        if (user?.walletAddress !== add) throw new Error('Địa chỉ ví không khớp');

        console.log("user?.walletAddress", user?.walletAddress);

        const res = await signMessageAsync({
            message,
            account: address,
            connector,
        });

        return res;
    };

    return { handleSign };
};