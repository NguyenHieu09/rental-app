import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    useRoute,
    RouteProp,
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { RootStackParamList } from '../../../types/navigation';
import { commonStyles } from '../../../styles/theme';
import { ICreateContractRequest } from '../../../types/contract';
import { createContractAndApproveRequest } from '../../../api/contract';
import { useSignMessageCustom } from '../../../hook/useSignMessageCustom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import { getOwnerCreateContractMessage } from '../../../utils/contract';
import ConnectWalletModal from '../../../components/modal/ConnectWalletModal';
import { W3mButton } from '@web3modal/wagmi-react-native';
import Button from '../../../components/button/Button';

type ContractScreenRouteProp = RouteProp<RootStackParamList, 'ContractScreen'>;

const ContractScreen = () => {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const route = useRoute<ContractScreenRouteProp>();
    const { contractData, requestId } = route.params;
    console.log('🚀 ~ ContractScreen ~ requestId:', requestId);
    const {
        contractContent,
        ownerId,
        renterId,
        propertyId,
        startDate,
        endDate,
        monthlyRent,
        depositAmount,
    } = contractData;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { handleSign } = useSignMessageCustom();
    const { address, isConnected } = useAccount();
    const user = useSelector((state: RootState) => state.user.user);
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        console.log('Address:', address);
        console.log('User Wallet Address:', user?.walletAddress);
        console.log('Is Connected:', isConnected);

        if (address && address === user?.walletAddress) {
            setModalVisible(false);
        } else {
            setModalVisible(true);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [address, user?.walletAddress, isConnected]);

    const handleCreateContract = async () => {
        try {
            if (!isConnected) {
                Alert.alert('Thông báo', 'Vui lòng kết nối ví để tiếp tục.');
                setModalVisible(true);
                return;
            }

            setCreateLoading(true);

            const contractRequest: ICreateContractRequest = {
                ownerId: ownerId,
                renterId: renterId,
                propertyId: propertyId,
                startDate: startDate.substring(0, 10),
                endDate: endDate.substring(0, 10),
                contractTerms: contractContent,
                monthlyRent: monthlyRent,
                depositAmount: depositAmount,
                signature: '',
            };

            const message = getOwnerCreateContractMessage(contractRequest);
            const signature = await handleSign({ message });
            console.log('🚀 ~ handleCreateContract ~ signature:', signature);

            const response = await createContractAndApproveRequest({
                ...contractRequest,
                signature,
                requestId: requestId,
            });
            console.log('🚀 ~ handleCreateContract ~ response:', response);

            Alert.alert('Thành công', 'Tạo hợp đồng thành công');
            navigation.navigate('ManageRequestRental');
        } catch (error: any) {
            console.error('Error creating contract:', error);
            Alert.alert(
                'Lỗi',
                `Có lỗi xảy ra khi tạo hợp đồng hoặc cập nhật trạng thái yêu cầu thuê: ${error.message}`,
            );
        } finally {
            setCreateLoading(false);
        }
    };

    if (loading) {
        return (
            <View
                style={[
                    commonStyles.container,
                    { justifyContent: 'center', alignItems: 'center', flex: 1 },
                ]}
            >
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <RenderHtml
                    contentWidth={screenWidth}
                    source={{ html: contractContent }}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    style={{
                        flex: 1,
                    }}
                    type='danger'
                    variant='outlined'
                    disabled={createLoading}
                >
                    Huỷ
                </Button>
                <Button
                    style={{
                        flex: 1,
                    }}
                    type='primary'
                    variant='fill'
                    onPress={handleCreateContract}
                    loading={createLoading}
                >
                    Tạo hợp đồng
                </Button>
            </View>
            <ConnectWalletModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        gap: 8,
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ContractScreen;
