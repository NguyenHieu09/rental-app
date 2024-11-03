// import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, ActivityIndicator, LogBox } from 'react-native';
// import { useFonts } from 'expo-font';
// import { Provider } from 'react-redux';
// import store from './src/redux-toolkit/store';
// import Navigation from './src/navigation/navigation';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { sepolia } from '@wagmi/core/chains';
// import {
//   createWeb3Modal,
//   defaultWagmiConfig,
//   Web3Modal,
// } from '@web3modal/wagmi-react-native';
// import { WagmiProvider } from 'wagmi';
// import '@walletconnect/react-native-compat';
// import { NODE_ENV, API_URL } from '@env';

// // Suppress the specific warning
// LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);

// // Setup queryClient
// const queryClient = new QueryClient();

// // Get projectId at https://cloud.walletconnect.com
// const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// // Create config
// const metadata = {
//   name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
//   description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
//   url: process.env.EXPO_PUBLIC_WAGMI_URL!,
//   icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
//   redirect: {
//     native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
//     universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
//   },
// };

// // Define Local and Staging Chains
// const localChain = {
//   id: 1337,
//   name: 'Localhost',
//   nativeCurrency: {
//     decimals: 18,
//     symbol: 'ETH',
//     name: 'Ethereum',
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://192.168.1.13:7545'],
//     },
//   },
// };

// const stagingChain = {
//   id: 1337,
//   name: 'Staging',
//   nativeCurrency: {
//     decimals: 18,
//     symbol: 'ETH',
//     name: 'Ethereum',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://ganache-staging.iuh-mern.id.vn'],
//     },
//   },
// };

// // Determine the current chain based on the environment
// // const currentChain = process.env.NODE_ENV === 'development' ? localChain : stagingChain;

// // // Log the current chain configuration
// // console.log('Current Chain:', currentChain);

// // console.log('NODE_ENV:', process.env.NODE_ENV);
// // console.log('node_env:', NODE_ENV);


// // Create chains configuration
// const chains = [
//   // process.env.NODE_ENV === 'development' ? localChain : stagingChain,
//   stagingChain,
//   sepolia,
// ] as const;

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // Create modal
// createWeb3Modal({
//   projectId,
//   wagmiConfig,
// });

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
//     antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
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
import { StyleSheet, ActivityIndicator, LogBox, SafeAreaView, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/store';
import Navigation from './src/navigation/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sepolia } from '@wagmi/core/chains';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';
import { WagmiProvider } from 'wagmi';
import '@walletconnect/react-native-compat';
import { NODE_ENV, API_URL } from '@env';
import Socket from './src/config/socket';

// Suppress the specific warning
LogBox.ignoreLogs(['TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.']);

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID!;

// Create config
const metadata = {
  name: process.env.EXPO_PUBLIC_WAGMI_NAME!,
  description: process.env.EXPO_PUBLIC_WAGMI_DESCRIPTION!,
  url: process.env.EXPO_PUBLIC_WAGMI_URL!,
  icons: [process.env.EXPO_PUBLIC_WAGMI_ICONS!],
  redirect: {
    native: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_NATIVE!,
    universal: process.env.EXPO_PUBLIC_WAGMI_REDIRECT_UNIVERSAL!,
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
      http: ['http://192.168.1.13:7545'],
    },
  },
};

const stagingChain = {
  id: 1337,
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

// Determine the current chain based on the environment
// const currentChain = process.env.NODE_ENV === 'development' ? localChain : stagingChain;

// // Log the current chain configuration
// console.log('Current Chain:', currentChain);

// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('node_env:', NODE_ENV);


// Create chains configuration
const chains = [
  // process.env.NODE_ENV === 'development' ? localChain : stagingChain,
  stagingChain,
  sepolia,
] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create modal
createWeb3Modal({
  projectId,
  wagmiConfig,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={styles.safeArea}>

            <Navigation />
            <Web3Modal />
            <Socket />
          </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});