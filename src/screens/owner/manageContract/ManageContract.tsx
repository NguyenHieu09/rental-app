import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  cancelContractBeforeDeposit,
  createCancelContractRequest,
  createExtensionRequest,
  fetchContractsForOwner,
  fetchRentalContractsForRenter,
} from "../../../api/contract";
import Button from "../../../components/button/Button";
import CancelBeforeDepositModal from "../../../components/modal/CancelBeforeDepositModal";
import CancelContractModal from "../../../components/modal/CancelContractModal";
import ConnectWalletModal from "../../../components/modal/ConnectWalletModal";
import ExtendContractModal from "../../../components/modal/ExtendContractModal";
import Tag from "../../../components/tag/Tag";
import { useSignMessageCustom } from "../../../hook/useSignMessageCustom";
import { setReLoad } from "../../../redux-toolkit/slices/baseSlice";
import { RootState } from "../../../redux-toolkit/store";
import { commonStyles } from "../../../styles/theme";
import { IContract } from "../../../types/contract";
import { ContractExtensionRequestType } from "../../../types/extensionRequest";
import { RootStackParamList } from "../../../types/navigation";
import { getContractColor } from "../../../utils/colorTag";
import { getStatusInVietnamese } from "../../../utils/contract";
import { formatPrice } from "../../../utils/formattedPrice";

const ManageContract = () => {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalContracts, setTotalContracts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<IContract | null>(
    null
  );
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [extendModalVisible, setExtendModalVisible] = useState(false);
  const ITEMS_PER_PAGE = 10;
  let debounceTimeout: NodeJS.Timeout | null = null;
  const { reload } = useSelector((state: RootState) => state.base);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);
  const { handleSign } = useSignMessageCustom();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [isConnected, setIsConnected] = useState(false);
  const disptach = useDispatch();

  // Set to track unique contract IDs
  const contractIds = new Set<string>();

  const loadContracts = async (page: number) => {
    if (!user) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu. Vui lòng thử lại sau.");
      return;
    }

    try {
      console.log(`Loading page ${page}...`);
      if (page === 0) setLoading(true);
      else setIsLoadingMore(true);

      const skip = page * ITEMS_PER_PAGE;
      console.log(`Fetching data with skip: ${skip}`);

      let response;
      if (user.userTypes.includes("owner")) {
        response = await fetchContractsForOwner(ITEMS_PER_PAGE, skip);
      } else if (user.userTypes.includes("renter")) {
        response = await fetchRentalContractsForRenter(ITEMS_PER_PAGE, skip);
      } else {
        throw new Error("Unknown user role");
      }

      const { contracts, total } = response;
      console.log("Total contracts:", total);

      if (total !== undefined) {
        // Filter out duplicate contracts
        const newContracts = contracts.filter((contract: IContract) => {
          if (contractIds.has(contract.contractId)) {
            return false;
          } else {
            contractIds.add(contract.contractId);
            return true;
          }
        });

        setContracts((prevContracts) => [...prevContracts, ...newContracts]);
        setTotalContracts(total);
      } else {
        console.error("Total contracts is undefined");
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      console.log("Loading state:", loading, "Is loading more:", isLoadingMore);
      disptach(setReLoad(false));
    }
  };

  useEffect(() => {
    if (user && (contracts.length === 0 || reload) && !loading) {
      setContracts([]);
      loadContracts(0);
    }
  }, [user, contracts, reload]);

  useEffect(() => {
    const verifyWalletAddress = async () => {
      if (address && user?.walletAddress) {
        if (address !== user.walletAddress) {
          // Địa chỉ ví không khớp
          await disconnectAsync();
          setIsConnected(false);
          setModalVisible(true);
          Alert.alert(
            "Thông báo",
            "Địa chỉ ví không khớp với địa chỉ đã đăng ký. Vui lòng kết nối ví đúng."
          );
        } else {
          // Địa chỉ ví khớp
          setIsConnected(true);
          setModalVisible(false); // Đóng modal nếu kết nối đúng
        }
      } else {
        // Chưa kết nối ví
        setIsConnected(false);
        setModalVisible(true);
      }
    };

    verifyWalletAddress();
  }, [address, user?.walletAddress, disconnectAsync]);

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(0); // Đặt lại trang hiện tại về 0
      loadContracts(0); // Tải lại hợp đồng từ trang đầu tiên
    }, [navigation])
  );

  const loadMoreContracts = () => {
    console.log("Attempting to load more contracts...");
    if (!isLoadingMore && contracts.length < totalContracts) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        console.log("Loading more contracts...");
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        loadContracts(nextPage);
      }, 300); // 300ms debounce time
    } else {
      console.log("No more contracts to load or already loading.");
    }
  };

  const handleCancelContract = (contract: IContract) => {
    setSelectedContract(contract);
    if (contract.status === "WAITING") {
      // Mở modal xác nhận hủy trước khi đặt cọc
      setConfirmModalVisible(true);
    } else if (
      contract.status === "DEPOSITED" ||
      contract.status === "ONGOING"
    ) {
      // Mở modal hủy sau khi đặt cọc
      setCancelModalVisible(true);
    } else {
      Alert.alert(
        "Không thể hủy",
        "Hợp đồng không nằm trong trạng thái có thể hủy."
      );
    }
  };

  const confirmCancelContract = async (cancelDate: Date, reason: string) => {
    if (selectedContract) {
      try {
        const message = `Hủy hợp đồng ${
          selectedContract.contractId
        } vào lúc ${format(cancelDate, "yyyy-MM-dd")}`;
        const signature = await handleSign({ message });

        await createCancelContractRequest({
          contractId: selectedContract.contractId,
          cancelDate: format(cancelDate, "yyyy-MM-dd"),
          reason,
          signature: signature,
        });
        Alert.alert("Thành công", "Đã gửi yêu cầu huỷ hợp đồng");
        setContracts((prevContracts) =>
          prevContracts.map((contract) => {
            if (contract.contractId !== selectedContract.contractId)
              return contract;

            return {
              ...contract,
              status: "PENDING_CANCELLATION",
            };
          })
        );
      } catch (error) {
        Alert.alert("Lỗi", "Có lỗi xảy ra khi gửi yêu cầu hủy hợp đồng");
      } finally {
        setCancelModalVisible(false);
        setSelectedContract(null);
      }
    }
  };

  const confirmCancelBeforeDeposit = async () => {
    if (selectedContract) {
      try {
        await cancelContractBeforeDeposit(selectedContract.contractId);
        Alert.alert("Thành công", "Huỷ hợp đồng thành công");
        setContracts((prevContracts) =>
          prevContracts.map((contract) => {
            if (contract.contractId !== selectedContract.contractId)
              return contract;

            return {
              ...contract,
              status: "CANCELLED",
            };
          })
        );
      } catch (error: any) {
        throw error;
      } finally {
        setConfirmModalVisible(false);
        setSelectedContract(null);
      }
    }
  };

  const handleExtendContract = (contract: IContract) => {
    setSelectedContract(contract);
    setExtendModalVisible(true);
  };

  const confirmExtendContract = async (
    extensionDate: string,
    reason: string
  ) => {
    if (selectedContract) {
      try {
        console.log(extensionDate);

        const extensionRequest = {
          contractId: selectedContract.contractId,
          type: "EXTEND_CONTRACT" as ContractExtensionRequestType,
          extensionDate,
          transactionId: null,
          reason,
        };

        await createExtensionRequest(extensionRequest);
        Alert.alert("Thành công", "Gửi yêu cầu gia hạn hợp đồng thành công");
      } catch (error: any) {
        throw error;
      } finally {
        setExtendModalVisible(false);
        setSelectedContract(null);
      }
    }
  };

  const renderContract = ({ item }: { item: IContract }) => {
    const isCancellable =
      item.status === "WAITING" ||
      item.status === "DEPOSITED" ||
      item.status === "ONGOING";

    return (
      <View key={item.contractId} style={styles.contractCard}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ContractDetails", {
              contractId: item.contractId,
            })
          }
        >
          <View style={styles.containerContract}>
            <View>
              {/* <Image source={{ uri: item.property.images[0] }} style={styles.image} /> */}
            </View>
            <View style={styles.details}>
              <Text style={styles.propertyTitle}>{item.property.title}</Text>
              {user && user.userTypes.includes("owner") ? (
                <Text>
                  Người thuê:{" "}
                  <Text style={commonStyles.fw600}>{item.renter.name}</Text>
                </Text>
              ) : (
                <Text>
                  Chủ nhà:{" "}
                  <Text style={commonStyles.fw600}>{item.owner.name}</Text>
                </Text>
              )}
              <Text style={styles.price}>
                Giá:{" "}
                <Text style={commonStyles.fw600}>
                  {formatPrice(item.monthlyRent)}
                </Text>
              </Text>
              <Text style={styles.deposit}>
                Tiền cọc:{" "}
                <Text style={commonStyles.fw600}>
                  {formatPrice(item.depositAmount)}
                </Text>
              </Text>
              <Text style={styles.dates}>
                Ngày bắt đầu:{" "}
                <Text style={commonStyles.fw600}>
                  {format(new Date(item.startDate), "dd/MM/yyyy")}
                </Text>
              </Text>
              <Text style={styles.dates}>
                Ngày kết thúc:{" "}
                <Text style={commonStyles.fw600}>
                  {format(new Date(item.endDate), "dd/MM/yyyy")}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Tag color={getContractColor(item.status)}>
            {getStatusInVietnamese(item.status)}
          </Tag>
          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              type="danger"
              onPress={() => isCancellable && handleCancelContract(item)} // Chỉ xử lý hủy khi nút không bị vô hiệu
              disabled={!isCancellable} // Vô hiệu hóa nút khi không thể hủy>
            >
              Huỷ hợp đồng
            </Button>
            {user?.userTypes.includes("renter") && (
              <Button
                type="primary"
                variant="fill"
                disabled={!isCancellable}
                onPress={() => isCancellable && handleExtendContract(item)}
              >
                Gia hạn
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading && currentPage === 0) {
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

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={contracts}
        renderItem={renderContract}
        keyExtractor={(item) => item.contractId}
        onEndReached={loadMoreContracts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={styles.loadingText}>Đang tải thêm...</Text>
            </View>
          ) : null
        }
      />

      {selectedContract && (
        <CancelContractModal
          visible={cancelModalVisible}
          onClose={() => setCancelModalVisible(false)}
          onConfirm={confirmCancelContract}
          contractId={selectedContract.contractId}
          startDate={selectedContract.startDate}
          endDate={selectedContract.endDate}
          price={selectedContract.monthlyRent}
          deposit={selectedContract.depositAmount}
        />
      )}

      {selectedContract && (
        <CancelBeforeDepositModal
          visible={confirmModalVisible}
          onClose={() => setConfirmModalVisible(false)}
          onConfirm={confirmCancelBeforeDeposit}
          contractId={selectedContract.contractId}
        />
      )}

      {selectedContract && (
        <ExtendContractModal
          visible={extendModalVisible}
          onClose={() => setExtendModalVisible(false)}
          onConfirm={confirmExtendContract}
          type="EXTEND_CONTRACT"
          contract={selectedContract}
        />
      )}
      <ConnectWalletModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contractCard: {
    backgroundColor: "#F5F4F8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  containerContract: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    marginTop: 10,
    color: "red",
    fontSize: 14,
    // paddingHorizontal: 10,
  },
  price: {},
  deposit: {},
  dates: {},
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    // justifyContent: 'space-between',
  },
  loadingContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 5,
    color: "gray",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cancelBtn: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  cancelBtnActive: {
    borderColor: "#ff4d4f",
  },
  cancelBtnDisabled: {
    borderColor: "#d9d9d9",
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});

export default ManageContract;
