import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fetchFilteredProperties } from "../../../api/api";
import RenderExploreItem from "../../../components/exploreItem/RenderExploreItem";
import SearchModal from "../../../components/modal/SearchModal";
import { commonStyles } from "../../../styles/theme";
import { RootStackParamList } from "../../../types/navigation";
import { IProperty } from "../../../types/property";

const ITEMS_PER_PAGE = 10;
const sortPropertyOptions = [
  {
    label: "Thông thường",
    value: "normal",
  },
  {
    label: "Mới nhất",
    value: "newest",
  },
  {
    label: "Cũ nhất",
    value: "oldest",
  },
  {
    label: "Giá",
    value: "price",
  },
];

const ExploreScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ExploreScreen">>();
  const city = route.params?.city;
  const isNoFilter = route.params?.isNoFilter;
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [exploreItems, setExploreItems] = useState<IProperty[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("normal");
  const [priceSortOrder, setPriceSortOrder] = useState<string>("price_asc");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (city) {
      setExploreItems([]);
      setCurrentPage(0);
      loadProperties(0, city, searchText, selectedSortOption);
    }
  }, [city, filters, searchText, selectedSortOption]);

  useEffect(() => {
    const loadInitialProperties = async () => {
      const selectedCity = route.params?.city || "";
      setExploreItems([]);
      setCurrentPage(0);
      loadProperties(0, selectedCity, searchText, selectedSortOption);
    };
    loadInitialProperties();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setExploreItems([]);
      setCurrentPage(0);
      loadProperties(0, filters.city || city, searchText, selectedSortOption);
    }, [searchText, city, filters, selectedSortOption])
  );

  useEffect(() => {
    if (filters.city) {
      loadProperties(0, filters.city, searchText, selectedSortOption);
    }
  }, [filters.city]);

  useFocusEffect(
    useCallback(() => {
      setExploreItems([]);
      setCurrentPage(0);
      loadProperties(0, city, searchText, selectedSortOption);
    }, [searchText, city, filters, selectedSortOption])
  );

  const handleApplyFilters = (appliedFilters: any) => {
    const selectedCity = appliedFilters.city || city;
    setFilters({ ...filters, city: selectedCity, ...appliedFilters });
    setModalVisible(false);
    setCurrentPage(0);
    setExploreItems([]);
    loadProperties(0, selectedCity, searchText, selectedSortOption);
  };

  const loadProperties = async (
    page: number,
    city?: string,
    query?: string,
    sortOption?: string
  ) => {
    try {
      if (page === 0) setLoading(true);
      else setIsLoadingMore(true);

      const skip = page * ITEMS_PER_PAGE;
      const filter = city ? { ...filters, city } : filters;

      // Log to debug
      console.log("Loading properties with filters:", filter, sortOption);

      const data = await fetchFilteredProperties(
        ITEMS_PER_PAGE,
        skip,
        isNoFilter ? { city } : filter,
        isNoFilter ? "" : query,
        sortOption
      );

      if (data && data.data) {
        setExploreItems((prevItems) =>
          page === 0 ? data.data : [...prevItems, ...data.data]
        );
        setTotalItems(data.pageInfo.total);
      } else {
        setExploreItems([]);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreProperties = () => {
    if (!isLoadingMore && exploreItems.length < totalItems) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        if (nextPage * ITEMS_PER_PAGE < totalItems) {
          loadProperties(nextPage, city, searchText, selectedSortOption);
        }
        return nextPage;
      });
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    loadProperties(0, city, searchText, selectedSortOption);
  };

  const handleSortOptionSelect = (option: string) => {
    if (option === "price") {
      const newSortOrder =
        selectedSortOption === "price_asc" ? "price_desc" : "price_asc";
      setPriceSortOrder(newSortOrder);
      setSelectedSortOption(newSortOrder);
      loadProperties(0, filters.city || city, searchText, newSortOrder);
    } else {
      setSelectedSortOption(option);
      loadProperties(0, filters.city || city, searchText, option);
    }
    setCurrentPage(0);
    setExploreItems([]);
  };

  return (
    <SafeAreaView style={[commonStyles.container]}>
      <View style={styles.findContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm nhà, căn hộ..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
              <AntDesign name="search1" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.selectButton}
          >
            <AntDesign name="filter" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.sort}>
          {sortPropertyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.buttonSort,
                selectedSortOption === option.value ||
                (option.value === "price" &&
                  (selectedSortOption === "price_asc" ||
                    selectedSortOption === "price_desc"))
                  ? styles.selectedSortButton
                  : null,
              ]}
              onPress={() => handleSortOptionSelect(option.value)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.sortButtonText,
                    selectedSortOption === option.value ||
                    (option.value === "price" &&
                      (selectedSortOption === "price_asc" ||
                        selectedSortOption === "price_desc"))
                      ? styles.selectedSortButtonText
                      : null,
                  ]}
                >
                  {option.label}
                </Text>
                {option.value === "price" &&
                  (selectedSortOption === "price_asc" ? (
                    <AntDesign name="arrowup" size={16} color="#007BFF" />
                  ) : selectedSortOption === "price_desc" ? (
                    <AntDesign name="arrowdown" size={16} color="#007BFF" />
                  ) : null)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading && currentPage === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      ) : exploreItems.length > 0 ? (
        <FlatList
          data={exploreItems}
          renderItem={({ item }) => (
            <RenderExploreItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => `${item.propertyId}-${index}`}
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
          ListHeaderComponent={<View style={{ height: 85 }} />}
        />
      ) : (
        <Text style={styles.emptyText}>Không có kết quả tìm kiếm</Text>
      )}

      <SearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  findContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: "100%",
    borderRadius: 5,
    marginRight: 10,
    resizeMode: "cover",
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  itemAddress: {
    fontSize: 14,
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  loadingContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 0,
  },
  sort: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonSort: {
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
  },
  selectedSortButton: {
    // backgroundColor: "#007BFF",
  },
  sortButtonText: {
    fontSize: 15,
    color: "#000",
  },
  selectedSortButtonText: {
    color: "#007BFF",
  },
});

export default ExploreScreen;
