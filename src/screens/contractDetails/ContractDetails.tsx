// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, Alert, Text } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { fetchContractDetails, fetchNotHandledCancelContractRequest, fetchHandledCancelContractRequest } from '../../api/contract';
// import { IContractDetail } from '../../types/contractDetail';
// import { commonStyles } from '../../styles/theme';
// import { ICancelContractResponse } from '../../types/cancelContract';
// import ContractDetailTab from '../../components/contract/ContractDetailTab';
// import NotHandledCancelRequestTab from '../../components/contract/NotHandledCancelRequestTab';
// import HandledCancelRequestTab from '../../components/contract/HandledCancelRequestTab';

// type ContractDetailsRouteProp = RouteProp<{ params: { contractId: string } }, 'params'>;

// const Tab = createMaterialTopTabNavigator();

// const ContractDetails: React.FC = () => {
//     const route = useRoute<ContractDetailsRouteProp>();
//     const { contractId } = route.params;
//     const [contract, setContract] = useState<IContractDetail | null>(null);
//     const [notHandledCancelRequest, setNotHandledCancelRequest] = useState<ICancelContractResponse | null>(null);
//     const [handledCancelRequest, setHandledCancelRequest] = useState<ICancelContractResponse[] | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const loadContractDetails = async () => {
//             try {
//                 const contractData = await fetchContractDetails(contractId);
//                 setContract(contractData);

//                 const notHandledData = await fetchNotHandledCancelContractRequest(contractId);
//                 setNotHandledCancelRequest(notHandledData);

//                 const handledData = await fetchHandledCancelContractRequest(contractId);
//                 setHandledCancelRequest(Array.isArray(handledData) ? handledData : [handledData]);
//             } catch (error) {
//                 Alert.alert('Lỗi', 'Không thể tải chi tiết hợp đồng');
//                 console.error('Error loading contract details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadContractDetails();
//     }, [contractId]);

//     if (loading) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!contract) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <Text>Không tìm thấy hợp đồng</Text>
//             </View>
//         );
//     }

//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Chi tiết hợp đồng">
//                 {() => <ContractDetailTab contract={contract} />}
//             </Tab.Screen>
//             <Tab.Screen name="Yêu cầu hủy chờ xử lý">
//                 {() => <NotHandledCancelRequestTab cancelRequest={notHandledCancelRequest} />}
//             </Tab.Screen>
//             <Tab.Screen name="Yêu cầu hủy đã xử lý">
//                 {() => <HandledCancelRequestTab cancelRequest={handledCancelRequest} />}
//             </Tab.Screen>
//         </Tab.Navigator>
//     );
// };

// export default ContractDetails;

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fetchContractDetails } from '../../api/contract';
import { IContractDetail } from '../../types/contractDetail';
import { commonStyles } from '../../styles/theme';
import ContractDetailTab from '../../components/contract/ContractDetailTab';
import NotHandledCancelRequestTab from '../../components/contract/NotHandledCancelRequestTab';
import HandledCancelRequestTab from '../../components/contract/HandledCancelRequestTab';

type ContractDetailsRouteProp = RouteProp<
    { params: { contractId: string } },
    'params'
>;

const Tab = createMaterialTopTabNavigator();

const ContractDetails: React.FC = () => {
    const route = useRoute<ContractDetailsRouteProp>();
    const { contractId } = route.params;
    const [contract, setContract] = useState<IContractDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadContractDetails = async () => {
            try {
                const contractData = await fetchContractDetails(contractId);
                setContract(contractData);
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể tải chi tiết hợp đồng');
                console.error('Error loading contract details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadContractDetails();
    }, [contractId]);

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

    if (!contract) {
        return (
            <View
                style={[
                    commonStyles.container,
                    { justifyContent: 'center', alignItems: 'center', flex: 1 },
                ]}
            >
                <Text>Không tìm thấy hợp đồng</Text>
            </View>
        );
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name='Chi tiết hợp đồng'>
                {() => <ContractDetailTab contractId={contractId} />}
            </Tab.Screen>
            <Tab.Screen name='Yêu cầu chờ xử lý'>
                {() => <NotHandledCancelRequestTab contractId={contractId} />}
            </Tab.Screen>
            <Tab.Screen name='Yêu cầu đã xử lý'>
                {() => <HandledCancelRequestTab contractId={contractId} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ContractDetails;
