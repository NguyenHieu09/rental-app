import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { commonStyles } from "../../../styles/theme";
// import { fetchRentalRequestsForRenter } from '../../../api/api';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import {
  fetchRentalRequestsForOwner,
  fetchRentalRequestsForRenter,
  generateContract,
  updateRentalRequestStatus,
  updateRentalRequestStatusRenter,
} from "../../../api/contract";
import Button from "../../../components/button/Button";
import Tag from "../../../components/tag/Tag";
import { RootState } from "../../../redux-toolkit/store";
import { RootStackParamList } from "../../../types/navigation";
import {
  IGenerateContractRequest,
  IRentalRequest,
} from "../../../types/rentalRequest";
import { getRentalRequestColor } from "../../../utils/colorTag";
import { formatPrice } from "../../../utils/formattedPrice";

export type RentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export const getStatusInVietnamese = (status: RentalRequestStatus): string => {
  if (status === "PENDING") return "Chờ xác nhận";
  if (status === "APPROVED") return "Đã xác nhận";
  if (status === "REJECTED") return "Đã từ chối";
  if (status === "CANCELLED") return "Đã hủy";
  return "Không xác định";
};

const NO_LOADING = 0;
const CANCEL_LOADING = 1;
const REJECT_LOADING = 2;
const ACCEPT_LOADING = 3;

const ManageRequestRental = () => {
  const [rentalRequests, setRentalRequests] = useState<IRentalRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadingType, setLoadingType] = useState(NO_LOADING);
  const [itemId, setItemId] = useState("");
  const ITEMS_PER_PAGE = 10;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);

  const loadRentalRequests = async (page: number) => {
    try {
      console.log(`Loading page ${page}...`);
      if (page === 0) setLoading(true);
      else setIsLoadingMore(true);

      const skip = page * ITEMS_PER_PAGE;
      console.log(`Fetching data with skip: ${skip}`);

      let response;
      if (user?.userTypes.includes("renter")) {
        response = await fetchRentalRequestsForRenter(ITEMS_PER_PAGE, skip);
      } else {
        response = await fetchRentalRequestsForOwner(ITEMS_PER_PAGE, skip);
      }

      // console.log('API response:', response);

      const { data, pageInfo } = response;
      console.log("Total requests:", pageInfo.total);

      if (pageInfo.total !== undefined) {
        if (page === 0) {
          setRentalRequests(data);
        } else {
          setRentalRequests((prevRequests) => [...prevRequests, ...data]);
        }
        setTotalRequests(pageInfo.total);
      } else {
        console.error("Total requests is undefined");
        Alert.alert("Error", "Total requests is undefined.");
      }
    } catch (error) {
      console.error("Error fetching rental requests:", error);
      Alert.alert("Error", "Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      console.log("Loading state:", loading, "Is loading more:", isLoadingMore);
    }
  };

  useEffect(() => {
    loadRentalRequests(0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRentalRequests([]);
      setCurrentPage(0);
      loadRentalRequests(0);
    }, [])
  );

  const loadMoreRequests = () => {
    console.log("Attempting to load more requests...");
    if (!isLoadingMore && rentalRequests.length < totalRequests) {
      console.log("Loading more requests...");
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadRentalRequests(nextPage);
    } else {
      console.log("No more requests to load or already loading.");
    }
  };

  const handleAcceptPress = async (item: IRentalRequest) => {
    if (!user?.isVerified) {
      Alert.alert("Error", "Người dùng chưa được xác thực.");
      return;
    }

    setLoadingType(ACCEPT_LOADING);
    setItemId(item.requestId);

    try {
      const contractRequest: IGenerateContractRequest = {
        propertyId: item.propertyId,
        renterId: item.renterId,
        rentalPrice: item.rentalPrice,
        rentalDeposit: item.rentalDeposit,
        rentalStartDate: format(item.rentalStartDate, "yyyy-MM-dd"),
        rentalEndDate: format(item.rentalEndDate, "yyyy-MM-dd"),
      };
      console.log("Contract Request:", contractRequest);

      const contractData = await generateContract(contractRequest);
      console.log("Contract Data:", contractData);

      navigation.navigate("ContractScreen", {
        contractData,
        requestId: item.requestId,
      });
    } catch (error) {
      console.error("Error fetching rental request details:", error);
      Alert.alert(
        "Lỗi",
        (error as any)?.message ||
          "Có lỗi xảy ra khi lấy thông tin chi tiết yêu cầu thuê."
      );
    } finally {
      setLoadingType(NO_LOADING);
      setItemId("");
    }
  };

  const handleRejectPress = async (item: IRentalRequest) => {
    setLoadingType(REJECT_LOADING);
    setItemId(item.requestId);

    try {
      await updateRentalRequestStatus(item.requestId, "REJECTED");
      // Sau khi cập nhật trạng thái thành công, bạn có thể cập nhật lại danh sách yêu cầu
      setRentalRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === item.requestId
            ? { ...request, status: "REJECTED" }
            : request
        )
      );
      Alert.alert("Thông báo", "Cập nhật trạng thái thành công.");
    } catch (error) {
      console.error("Error rejecting rental request:", error);
      Alert.alert("Error", "Có lỗi xảy ra khi từ chối yêu cầu.");
    } finally {
      setLoadingType(NO_LOADING);
      setItemId("");
    }
  };

  const handleCancelPress = async (item: IRentalRequest) => {
    setLoadingType(CANCEL_LOADING);
    setItemId(item.requestId);

    try {
      // Gọi API để cập nhật trạng thái của yêu cầu
      await updateRentalRequestStatusRenter(item.requestId, "CANCELLED");

      // Sau khi cập nhật trạng thái thành công, cập nhật lại danh sách yêu cầu
      setRentalRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === item.requestId
            ? { ...request, status: "CANCELLED" }
            : request
        )
      );

      // Thông báo thành công
      Alert.alert("Thông báo", "Huỷ yêu cầu thuê nhà thành công.");
    } catch (error) {
      console.error("Error cancelling rental request:", error);
      Alert.alert("Error", "Có lỗi xảy ra khi hủy yêu cầu.");
    } finally {
      setLoadingType(NO_LOADING);
      setItemId("");
    }
  };

  const renderRentalRequest = ({ item }: { item: IRentalRequest }) => (
    <View key={item.requestId} style={styles.requestCard}>
      <View style={styles.containerRequest}>
        {item.property.images && item.property.images[0] && (
          <Image
            source={{ uri: item.property.images[0] }}
            style={styles.image}
          />
        )}
        <View style={styles.details}>
          <Text style={styles.propertyTitle}>
            {item.property.title || "No Title"}
          </Text>
          <Text style={styles.price}>
            Giá thuê:{" "}
            <Text style={commonStyles.fw600}>
              {formatPrice(item.rentalPrice)}
            </Text>
          </Text>
          <Text style={styles.deposit}>
            Tiền cọc:{" "}
            <Text style={commonStyles.fw600}>
              {formatPrice(item.rentalDeposit)}
            </Text>
          </Text>
          <Text style={styles.dates}>
            Ngày bắt đầu:{" "}
            <Text style={commonStyles.fw600}>
              {item.rentalStartDate
                ? format(new Date(item.rentalStartDate), "dd/MM/yyyy")
                : "N/A"}
            </Text>
          </Text>
          <Text style={styles.dates}>
            Ngày kết thúc:{" "}
            <Text style={commonStyles.fw600}>
              {item.rentalEndDate
                ? format(new Date(item.rentalEndDate), "dd/MM/yyyy")
                : "N/A"}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <Tag color={getRentalRequestColor(item.status)}>
            {getStatusInVietnamese(item.status)}
          </Tag>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            {user?.userTypes.includes("renter") &&
              item.status === "PENDING" && (
                <Button
                  variant="outlined"
                  type="danger"
                  onPress={() => handleCancelPress(item)}
                  loading={
                    loadingType === CANCEL_LOADING && itemId === item.requestId
                  }
                >
                  Huỷ yêu cầu
                </Button>
              )}
            {user?.userTypes.includes("owner") && (
              <>
                <Button
                  variant="outlined"
                  type="danger"
                  onPress={() => handleRejectPress(item)}
                  disabled={item.status !== "PENDING"}
                  loading={
                    loadingType === REJECT_LOADING && itemId === item.requestId
                  }
                >
                  Từ chối
                </Button>
                <Button
                  variant="fill"
                  type="primary"
                  onPress={() => handleAcceptPress(item)}
                  disabled={item.status !== "PENDING"}
                  loading={
                    loadingType === ACCEPT_LOADING && itemId === item.requestId
                  }
                >
                  Chấp nhận
                </Button>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );

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
        data={rentalRequests}
        renderItem={renderRentalRequest}
        keyExtractor={(item) => item.requestId}
        onEndReached={loadMoreRequests}
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
    </View>
  );
};

const styles = StyleSheet.create({
  requestCard: {
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
  containerRequest: {
    flexDirection: "row",
  },
  image: {
    flex: 1,
    borderRadius: 8,
    marginRight: 10,
    width: 100,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    // flex: 1,
    width: 110,
    // backgroundColor: 'red',
    marginTop: 10,
    color: "red",
    fontSize: 14,
    paddingHorizontal: 10,
  },
  price: {
    marginTop: 5,
  },
  deposit: {
    marginTop: 5,
  },
  dates: {
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
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
});

export default ManageRequestRental;
