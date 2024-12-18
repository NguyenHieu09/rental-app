import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { fetchContractDetails } from "../../api/contract";
import { IContractDetail } from "../../types/contractDetail";
import { commonStyles } from "../../styles/theme";
import ContractDetailTab from "../../components/contract/ContractDetailTab";
import NotHandledCancelRequestTab from "../../components/contract/NotHandledCancelRequestTab";
import HandledCancelRequestTab from "../../components/contract/HandledCancelRequestTab";
import { RootStackParamList } from "../../types/navigation";
import { IconOutline } from "@ant-design/icons-react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store";

type ContractDetailsRouteProp = RouteProp<
  { params: { contractId: string } },
  "params"
>;

const Tab = createMaterialTopTabNavigator();

const ContractDetails: React.FC = () => {
  const route = useRoute<ContractDetailsRouteProp>();
  const { contractId } = route.params;
  const [contract, setContract] = useState<IContractDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);

  useLayoutEffect(() => {
    if (user?.userTypes.includes("renter")) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ right: 10 }}
            onPress={() => navigation.navigate("AddReport", { contractId })}
          >
            <Text>Thêm báo cáo</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, contract?.contractId, user?.userTypes]);

  useEffect(() => {
    const loadContractDetails = async () => {
      try {
        const contractData = await fetchContractDetails(contractId);
        setContract(contractData);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải chi tiết hợp đồng");
        console.error("Error loading contract details:", error);
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
          { justifyContent: "center", alignItems: "center", flex: 1 },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!contract) {
    return (
      <View
        style={[
          commonStyles.container,
          { justifyContent: "center", alignItems: "center", flex: 1 },
        ]}
      >
        <Text>Không tìm thấy hợp đồng</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Chi tiết hợp đồng">
        {() => <ContractDetailTab contractId={contractId} />}
      </Tab.Screen>
      <Tab.Screen name="Yêu cầu chờ xử lý">
        {() => <NotHandledCancelRequestTab contractId={contractId} />}
      </Tab.Screen>
      <Tab.Screen name="Yêu cầu đã xử lý">
        {() => <HandledCancelRequestTab contractId={contractId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ContractDetails;
