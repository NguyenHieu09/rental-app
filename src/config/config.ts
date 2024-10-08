// // // import { createConfig, http } from '@wagmi/core';
// // // import { sepolia } from '@wagmi/core/chains';

// // // export const wagmiConfig = createConfig({
// // //     chains: [sepolia],
// // //     transports: {
// // //         [sepolia.id]: http(),
// // //     },
// // // });
// // // // // // import { createConfig, http } from '@wagmi/core';
// // // // // // import { sepolia } from '@wagmi/core/chains';

// // // // // // // Get projectId from environment variables
// // // // // // const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// // // // // // if (!projectId) throw new Error('Project ID is not defined');

// // // // // // const metadata = {
// // // // // //     name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
// // // // // //     description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
// // // // // //     url: process.env.EXPO_PUBLIC_WAGMI_URL!,
// // // // // //     icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
// // // // // //     redirect: {
// // // // // //         native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
// // // // // //         universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
// // // // // //     },
// // // // // // };

// // // // // // // Create wagmiConfig
// // // // // // const chains = [sepolia] as const;

// // // // // // export const wagmiConfig = createConfig({
// // // // // //     chains: [
// // // // // //         (process.env.NODE_ENV === 'development' && {
// // // // // //             id: 1337,
// // // // // //             name: 'Localhost',
// // // // // //             nativeCurrency: {
// // // // // //                 decimals: 18,
// // // // // //                 symbol: 'ETH',
// // // // // //                 name: 'Ethereum',
// // // // // //             },
// // // // // //             rpcUrls: {
// // // // // //                 default: {
// // // // // //                     http: ['http://localhost:7545'],
// // // // // //                 },
// // // // // //             },
// // // // // //         }) || {
// // // // // //             id: 1337,
// // // // // //             name: 'Staging',
// // // // // //             nativeCurrency: {
// // // // // //                 decimals: 18,
// // // // // //                 symbol: 'ETH',
// // // // // //                 name: 'Ethereum',
// // // // // //             },
// // // // // //             rpcUrls: {
// // // // // //                 default: {
// // // // // //                     http: ['https://ganache-staging.iuh-mern.id.vn'],
// // // // // //                 },
// // // // // //             },
// // // // // //         },
// // // // // //         ...chains,
// // // // // //     ],
// // // // // //     transports: {
// // // // // //         [sepolia.id]: http(),
// // // // // //     },
// // // // // //     projectId,
// // // // // //     metadata,
// // // // // // });

// // import { createConfig, http } from '@wagmi/core';
// // import { sepolia, mainnet } from '@wagmi/core/chains';
// // import { metaMask } from '@wagmi/connectors';

// // // Get projectId from environment variables
// // const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// // if (!projectId) throw new Error('Project ID is not defined');

// // const metadata = {
// //     name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
// //     description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
// //     url: process.env.EXPO_PUBLIC_WAGMI_URL!,
// //     icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
// //     redirect: {
// //         native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
// //         universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
// //     },
// // };

// // // Define Local and Staging Chains
// // const localChain = {
// //     id: 1337,
// //     name: 'Localhost',
// //     nativeCurrency: {
// //         decimals: 18,
// //         symbol: 'ETH',
// //         name: 'Ethereum',
// //     },
// //     rpcUrls: {
// //         default: {
// //             http: ['http://localhost:7545'],
// //         },
// //     },
// // };

// // const stagingChain = {
// //     id: 1338,
// //     name: 'Staging',
// //     nativeCurrency: {
// //         decimals: 18,
// //         symbol: 'ETH',
// //         name: 'Ethereum',
// //     },
// //     rpcUrls: {
// //         default: {
// //             http: ['https://ganache-staging.iuh-mern.id.vn'],
// //         },
// //     },
// // };

// // // Create wagmiConfig
// // const chains = [sepolia, mainnet] as const;

// // export const wagmiConfig = createConfig({
// //     connectors: [metaMask()],
// //     chains: [
// //         (process.env.NODE_ENV === 'development' ? localChain : stagingChain),
// //         ...chains,
// //     ],
// //     transports: {
// //         [sepolia.id]: http(),
// //         [mainnet.id]: http(),
// //     },
// //     projectId,
// //     metadata,
// // });

// import { createConfig, http } from '@wagmi/core';
// import { sepolia, mainnet } from '@wagmi/core/chains';
// import { metaMask } from '@wagmi/connectors';

// // Get projectId from environment variables
// const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// if (!projectId) throw new Error('Project ID is not defined');

// // Metadata for the wallet connection
// const metadata = {
//     name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
//     description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
//     url: process.env.EXPO_PUBLIC_WAGMI_URL!,
//     icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
//     redirect: {
//         native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
//         universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
//     },
// };

// // Define Local and Staging Chains
// const localChain = {
//     id: 1337,
//     name: 'Localhost',
//     nativeCurrency: {
//         decimals: 18,
//         symbol: 'ETH',
//         name: 'Ethereum',
//     },
//     rpcUrls: {
//         default: {
//             http: ['http://localhost:7545'],
//         },
//     },
// };

// const stagingChain = {
//     id: 1338,
//     name: 'Staging',
//     nativeCurrency: {
//         decimals: 18,
//         symbol: 'ETH',
//         name: 'Ethereum',
//     },
//     rpcUrls: {
//         default: {
//             http: ['https://ganache-staging.iuh-mern.id.vn'],
//         },
//     },
// };

// // Create wagmiConfig
// const chains = [sepolia, mainnet] as const;

// export const wagmiConfig = createConfig({
//     connectors: [
//         metaMask({

//         }),
//     ],
//     chains: [
//         (process.env.NODE_ENV === 'development' ? localChain : stagingChain),
//         ...chains,
//     ],
//     transports: {
//         [sepolia.id]: http(),
//         [mainnet.id]: http(),
//     },
// });

import { createConfig, http } from '@wagmi/core';
import { sepolia, mainnet } from '@wagmi/core/chains';
import { metaMask, walletConnect } from '@wagmi/connectors';

// Lấy projectId từ environment variables
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

if (!projectId) throw new Error('Project ID is not defined');

// Metadata cho WalletConnect
const metadata = {
    name: process.env.EXPO_PUBLIC_WAGMI_NAME || 'My App',
    description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION || 'Description of My App',
    url: process.env.EXPO_PUBLIC_WAGMI_URL || 'https://myapp.com',
    icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS || 'https://myapp.com/icon.png'],
    redirect: {
        native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE || 'https://myapp.com/redirect/native',
        universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL || 'https://myapp.com/redirect/universal',
    },
};

// Define Local and Staging Chains
const localChain = {
    id: 1337,
    name: 'Localhost',
    nativeCurrency: {
        decimals: 18,
        symbol: 'ETH',
        name: 'Ethereum',
    },
    rpcUrls: {
        default: {
            http: ['http://localhost:7545'],
        },
    },
};

const stagingChain = {
    id: 1338,
    name: 'Staging',
    nativeCurrency: {
        decimals: 18,
        symbol: 'ETH',
        name: 'Ethereum',
    },
    rpcUrls: {
        default: {
            http: ['https://ganache-staging.iuh-mern.id.vn'],
        },
    },
};

// Create wagmiConfig
const chains = [sepolia, mainnet] as const;

export const wagmiConfig = createConfig({
    connectors: [
        metaMask(), // MetaMask không cần metadata
        walletConnect({ projectId, metadata }), // WalletConnect có hỗ trợ metadata
    ],
    chains: [
        (process.env.NODE_ENV === 'development' ? localChain : stagingChain),
        ...chains,
    ],
    transports: {
        [sepolia.id]: http(),
        [mainnet.id]: http(),
    },
});
