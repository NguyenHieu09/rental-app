import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialIcons";

import { IconOutline } from "@ant-design/icons-react-native";
import { fetchPropertyDetail, fetchPropertyReviews } from "../../api/api";
import { commonStyles } from "../../styles/theme";
import { RootStackParamList } from "../../types/navigation";
import { IProperty } from "../../types/property";
import { IReview } from "../../types/review";
import { formatPrice } from "../../utils/formattedPrice";
import ShowReviews from "../review/ShowReview";

const { width: screenWidth } = Dimensions.get("window");

const PropertyDetail: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "PropertyScreen">>();
  const { slug } = route.params;
  const [property, setProperty] = useState<IProperty | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ right: 10 }}
          onPress={() => navigation.navigate("EditPropertyScreen", { slug })}
        >
          <IconOutline name="edit" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, slug]);

  useFocusEffect(
    React.useCallback(() => {
      const loadPropertyDetail = async () => {
        try {
          const data = await fetchPropertyDetail(slug);
          setProperty(data);
          console.log("🚀 ~ data:", data);
        } catch (err: any) {
          console.error("Error fetching property detail:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      const loadReviews = async () => {
        try {
          const reviewsData = await fetchPropertyReviews(slug);
          setReviews(reviewsData);
        } catch (err: any) {
          console.error("Error fetching property reviews:", err);
          setError(err.message);
        }
      };

      loadPropertyDetail();
      loadReviews();
    }, [slug])
  );

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View>
        <Text>Không tìm thấy bài viết</Text>
      </View>
    );
  }

  const {
    images,
    rating,
    ratingCount,
    title,
    description,
    address,
    minDuration,
    price,
    deposit,
    rentalConditions,
    owner,
  } = property;
  const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
  const formattedPrice = formatPrice(price);
  const formattedDeposit = formatPrice(deposit);

  const area = rentalConditions.find(
    (condition) => condition.type === "Diện tích"
  )?.value;
  const bed = rentalConditions.find(
    (condition) => condition.type === "Phòng ngủ"
  )?.value;
  const bath = rentalConditions.find(
    (condition) => condition.type === "Phòng tắm"
  )?.value;
  const floors = rentalConditions.find(
    (condition) => condition.type === "Số tầng"
  )?.value;
  const furniture = rentalConditions.find(
    (condition) => condition.type === "Nội thất"
  )?.value;

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() =>
        navigation.navigate("ImageDetailScreen", { imageUrl: item })
      }
    >
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={[{ key: "property" }, { key: "reviews" }]}
      renderItem={({ item }) => {
        console.log("🚀 ~ item:", item);
        if (item.key === "property") {
          return (
            <View style={commonStyles.container}>
              <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.infoItem}>
                  <Text style={styles.price}>Tiền thuê: </Text>
                  <Text style={styles.price}>{formattedPrice}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.price}>Tiền cọc: </Text>
                  <Text style={styles.price}>{formattedDeposit}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Thời gian thuê tối thiểu:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {minDuration} tháng
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <AntDesign
                    name="enviromento"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                  <Text style={styles.location}>{location}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.infoItem}>
                    <Icon name="bed" size={20} color="black" />
                    <Text style={styles.infoText}>{bed} ngủ</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon name="bathtub" size={20} color="black" />
                    <Text style={styles.infoText}>{bath} tắm</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon name="height" size={20} color="black" />
                    <Text style={styles.infoText}>{floors}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon name="area-chart" size={20} color="black" />
                    <Text style={styles.infoText}>{area}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon name="chair" size={20} color="black" />
                    <Text style={styles.infoText}>{furniture}</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14 }}>Mô tả: {description}</Text>
                </View>
              </View>
            </View>
          );
        } else if (item.key === "reviews") {
          return (
            <View style={commonStyles.container}>
              <View style={styles.review}>
                <Text style={styles.sectionTitle}>Đánh giá</Text>
                {ratingCount > 0 && (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#FFD700",
                        borderRadius: 5,
                        marginHorizontal: 5,
                        backgroundColor: "#fffdf3",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="star"
                        size={20}
                        color="#FFD700"
                      />
                      <Text style={styles.ratingText}>
                        {(rating / 2).toFixed(2)}
                      </Text>
                    </View>
                    <Text style={styles.text}>Có {ratingCount} đánh giá</Text>
                  </>
                )}
              </View>
              {ratingCount <= 0 && (
                <Text style={[styles.text, { textAlign: "center" }]}>
                  Chưa có đánh giá nào
                </Text>
              )}

              <ShowReviews reviews={reviews} />
            </View>
          );
        }
        return null;
      }}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  carouselItem: {
    width: screenWidth,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: -4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "gray",
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "black",
    marginLeft: 8,
  },
  favoriteButton: {
    alignSelf: "flex-end",
  },
  reviewContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
  },
  reviewerName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewerRole: {
    color: "gray",
    marginBottom: 8,
  },
  reviewText: {
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#FFD700",
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontWeight: "bold",
    width: 600,
  },
  ownerRole: {
    color: "gray",
  },
  requestButton: {
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
  },
  media: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  content: {},
  review: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: '#FFD700',
    // borderRadius: 5,
    padding: 5,

    marginVertical: 10,
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default PropertyDetail;
