// // // App.tsx
// // import 'react-native-gesture-handler';
// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
// // import { useFonts } from 'expo-font';
// // import { Provider } from 'react-redux';
// // import store from './src/redux-toolkit/store';
// // import Navigation from './src/navigation/navigation';

// // // Suppress the specific warning
// // LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);


// // export default function App() {
// //   const [fontsLoaded] = useFonts({
// //     antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
// //     antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
// //   });

// //   if (!fontsLoaded) {
// //     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
// //   }

// //   return (
// //     <Provider store={store}>
// //       <Navigation />
// //     </Provider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   loading: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // // // App.tsx
// // // import 'react-native-gesture-handler';
// // // import { StatusBar } from 'expo-status-bar';
// // // import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
// // // import { useFonts } from 'expo-font';
// // // import { Provider } from 'react-redux';
// // // import store from './src/redux-toolkit/store';
// // // import Navigation from './src/navigation/navigation';
// // // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// // // import { sepolia } from '@wagmi/core/chains';
// // // import {
// // //   createWeb3Modal,
// // //   defaultWagmiConfig,
// // //   Web3Modal,
// // // } from '@web3modal/wagmi-react-native';
// // // import { WagmiProvider } from 'wagmi';
// // // // import ButtonTabsNavigation from './src/components/ButtonTabsNavigation';
// // // import '@walletconnect/react-native-compat';

// // // // Suppress the specific warning
// // // LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);

// // // // Setup queryClient
// // // const queryClient = new QueryClient();

// // // // Get projectId at https://cloud.walletconnect.com
// // // const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// // // // Create config
// // // const metadata = {
// // //   name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
// // //   description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
// // //   url: process.env.EXPO_PUBLIC_WAGMI_URL!,
// // //   icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
// // //   redirect: {
// // //     native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
// // //     universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
// // //   },
// // // };

// // // const chains = [sepolia] as const;

// // // const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // // // Create modal
// // // createWeb3Modal({
// // //   projectId,
// // //   wagmiConfig,
// // // });

// // // export default function App() {
// // //   const [fontsLoaded] = useFonts({
// // //     antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
// // //   });

// // //   if (!fontsLoaded) {
// // //     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
// // //   }

// // //   return (
// // //     <Provider store={store}>
// // //       <WagmiProvider config={wagmiConfig}>
// // //         <QueryClientProvider client={queryClient}>
// // //           <Navigation />
// // //           <Web3Modal />
// // //         </QueryClientProvider>
// // //       </WagmiProvider>
// // //     </Provider>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   loading: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // // });

// import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
// import { useFonts } from 'expo-font';
// import { Provider } from 'react-redux';
// import store from './src/redux-toolkit/store';
// import Navigation from './src/navigation/navigation';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider } from 'wagmi';
// import { Web3Modal } from '@web3modal/wagmi-react-native';
// import { wagmiConfig } from './config'

// // Suppress the specific warning
// LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);

// // Setup queryClient
// const queryClient = new QueryClient();

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
//   });

//   if (!fontsLoaded) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
//   }

//   return (
//     <Provider store={store}>
//       <WagmiProvider config={wagmiConfig}>
//         <QueryClientProvider client={queryClient}>
//           <Navigation />
//           <Web3Modal />
//         </QueryClientProvider>
//       </WagmiProvider>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/store';
import Navigation from './src/navigation/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Web3Modal } from '@web3modal/wagmi-react-native';
import { createConfig, http } from '@wagmi/core';
import { sepolia, mainnet } from '@wagmi/core/chains';
import { metaMask, walletConnect } from '@wagmi/connectors';

// Suppress the specific warning
LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId from environment variables
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

if (!projectId) throw new Error('Project ID is not defined');

// Metadata for WalletConnect
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

const wagmiConfig = createConfig({
  connectors: [
    metaMask(), // MetaMask does not need metadata
    walletConnect({ projectId, metadata }), // WalletConnect supports metadata
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

export default function App() {
  const [fontsLoaded] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <Web3Modal />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});