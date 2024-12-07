import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PropertyItem from "../../../components/properties/PropertyItem";
import {
  deleteProperty,
  fetchPropertiesWithFilters,
  updatePropertyVisibility,
} from "../../../api/api";
import { IProperty, IFilterProperty } from "../../../types/property";
import { commonStyles } from "../../../styles/theme";
import Button from "../../../components/button/Button";

const ManageProperty: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false); // State for checkbox visibility
  const ITEMS_PER_PAGE = 10;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ right: 15 }}
          onPress={() => setShowCheckboxes(!showCheckboxes)}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Sửa</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, showCheckboxes]);

  const loadProperties = async (page: number) => {
    try {
      console.log(`Loading page ${page}...`);
      if (page === 0) setLoading(true);
      else setIsLoadingMore(true);

      const skip = page * ITEMS_PER_PAGE;
      console.log(`Fetching data with skip: ${skip}`);
      const filters: IFilterProperty = {};

      const response = await fetchPropertiesWithFilters(
        filters,
        ITEMS_PER_PAGE,
        skip
      );

      const { properties, total } = response;

      console.log("Total properties:", total);

      if (total !== undefined) {
        setProperties((prevProperties) =>
          page === 0 ? properties : [...prevProperties, ...properties]
        );
        setTotalProperties(total);
      } else {
        console.error("Total properties is undefined");
        Alert.alert("Error", "Total properties is undefined.");
      }
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      setError(err.message);
      Alert.alert("Error", "Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      console.log("Loading state:", loading, "Is loading more:", isLoadingMore);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProperties(0);
    }, [])
  );

  const loadMoreProperties = () => {
    console.log("Attempting to load more properties...");
    if (!isLoadingMore && properties.length < totalProperties) {
      console.log("Loading more properties...");
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadProperties(nextPage);
    } else {
      console.log("No more properties to load or already loading.");
    }
  };

  const handleDelete = async (id: string) => {
    const property = properties.find((property) => property.propertyId === id);
    if (!property) {
      Alert.alert("Lỗi", "Không tìm thấy bất động sản.");
      return;
    }

    if (property.status !== "PENDING" && property.status !== "ACTIVE") {
      Alert.alert(
        "Lỗi",
        "Chỉ có thể xóa bất động sản ở trạng thái Đang chờ duyệt hoặc Đã duyệt."
      );
      return;
    }

    try {
      const response = await deleteProperty(id);
      if (response.success) {
        Alert.alert("Thành công", "Xóa bất động sản thành công.");
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.propertyId !== id)
        );
      } else {
        Alert.alert("Lỗi", response.message);
      }
    } catch (error: any) {
      console.error("Error deleting property:", error);
      Alert.alert("Error", "Có lỗi xảy ra khi xóa bất động sản.");
    }
  };

  const handleSelect = (id: string) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((propertyId) => propertyId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleUpdateVisibility = async (status: string) => {
    console.log(
      `${status === "ACTIVE" ? "Show" : "Hide"} selected properties:`,
      selectedProperties
    );

    try {
      const response = await updatePropertyVisibility(
        selectedProperties,
        status
      );
      Alert.alert(
        "Thành công",
        `${status === "ACTIVE" ? "Hiện" : "Ẩn"} bất động sản thành công.`
      );
      setSelectedProperties([]);
      loadProperties(0); // Reload data after successful update
    } catch (error: any) {
      console.error(
        `Error ${status === "ACTIVE" ? "showing" : "hiding"} properties:`,
        error
      );

      let errorMessage = "Đã xảy ra lỗi không xác định.";

      // Xử lý lỗi từ phản hồi API
      if (error.response && error.response.data) {
        // Kiểm tra và lấy message hoặc details từ phản hồi API
        const { message, details } = error.response.data;
        errorMessage = message || "Đã xảy ra lỗi trong quá trình xử lý.";
        if (details) {
          errorMessage += `\nChi tiết: ${details}`;
        }
      } else if (error.message) {
        // Xử lý trường hợp lỗi không liên quan đến API
        errorMessage = error.message;
      }

      Alert.alert("Lỗi", errorMessage);
    }
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

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={properties}
        renderItem={({ item, index }) => {
          return (
            <PropertyItem
              item={item}
              onDelete={handleDelete}
              onSelect={handleSelect}
              isSelected={selectedProperties.includes(item.propertyId)}
              showCheckboxes={showCheckboxes}
              key={`${item.propertyId}-${index}`} // Ensure unique key
            />
          );
        }}
        keyExtractor={(item, index) => `${item.propertyId}-${index}`} // Ensure unique key
        onEndReached={loadMoreProperties}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={styles.loadingText}>Đang tải thêm...</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.list}
      />
      {selectedProperties.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.hideButton}
            variant="outlined"
            type="danger"
            onPress={() => handleUpdateVisibility("INACTIVE")}
          >
            Ẩn bất đông sản
          </Button>
          <Button
            style={styles.showButton}
            variant="fill"
            type="primary"
            onPress={() => handleUpdateVisibility("ACTIVE")}
          >
            Hiện bất đông sản
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  list: {
    paddingBottom: 20,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  hideButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  hideButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  showButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  showButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ManageProperty;
