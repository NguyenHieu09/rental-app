import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@walletconnect/react-native-compat';
import {
    createWeb3Modal,
    defaultWagmiConfig,
    Web3Modal,
} from '@web3modal/wagmi-react-native';
import { useFonts } from 'expo-font';
import 'node-libs-expo/globals';
import { ActivityIndicator, LogBox, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { Chain } from 'viem';
import { http, WagmiProvider } from 'wagmi';
import Socket from './src/config/socket';
import Navigation from './src/navigation/navigation';
import store from './src/redux-toolkit/store';

LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
]);

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

const stagingChain = {
    id: Number(process.env.NEXT_PUBLIC_CHAIN_ID!),
    name: process.env.NEXT_PUBLIC_CHAIN_NAME!,
    nativeCurrency: {
        decimals: Number(process.env.NEXT_PUBLIC_CHAIN_DECIMALS!),
        symbol: process.env.NEXT_PUBLIC_CHAIN_SYMBOL!,
        name: process.env.NEXT_PUBLIC_CHAIN_CURRENCY!,
    },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_CHAIN_NPC_URL!],
        },
    },
};

// Create chains configuration
const chains = [
    stagingChain as Chain,
    // sepolia,
] as const;

const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    transports: {
        [stagingChain.id]: http(),
    },
});

// Create modal
createWeb3Modal({
    metadata,
    projectId,
    wagmiConfig,
});

export default function App() {
    const [fontsLoaded] = useFonts({
        antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
        antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <ActivityIndicator
                size='large'
                color='#0000ff'
                style={styles.loading}
            />
        );
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
