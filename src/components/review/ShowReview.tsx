import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { IReview } from "../../types/review";
import { getFirstAndLastName } from "../../utils/avatar";
import { formatDateTime } from "../../utils/datetime";

interface Props {
  reviews: IReview[];
}

const ShowReviews: React.FC<Props> = ({ reviews }) => {
  const renderReviewItem = ({ item }: { item: IReview }) => {
    const getUserDetails = (userId: string) => {
      if (userId === item.renter.userId) {
        return item.renter;
      }
      if (userId === item.owner.userId) {
        return item.owner;
      }
      return null;
    };

    const renderChildren = item.children?.map((child) => {
      const userDetails = getUserDetails(child.userId);
      return (
        <View key={child.id} style={styles.childReview}>
          {userDetails && (
            <View style={styles.userContainer}>
              {userDetails.avatar ? (
                <Image
                  source={{ uri: userDetails.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.nameInitials}>
                  <Text style={styles.initials}>
                    {getFirstAndLastName(userDetails.name)}
                  </Text>
                </View>
              )}
              <View>
                <Text style={styles.userName}>{userDetails.name}</Text>
                {/* <StarRating
                                    rating={child.rating / 2}
                                    onChange={() => { }}
                                    starSize={25}
                                    color="#f1c40f"
                                /> */}
                <Text style={styles.content}>{child.content}</Text>
                {child.medias?.length > 0 &&
                  child.medias.map((media, index) => (
                    <Image
                      key={index}
                      source={{ uri: media }}
                      style={styles.media}
                    />
                  ))}
                <Text style={styles.date}>
                  {formatDateTime(child.createdAt)}
                </Text>
              </View>
            </View>
          )}
        </View>
      );
    });

    return (
      <View style={styles.reviewContainer}>
        <View style={styles.userContainer}>
          {item.renter.avatar ? (
            <Image source={{ uri: item.renter.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.nameInitials}>
              <Text style={styles.initials}>
                {getFirstAndLastName(item.renter.name)}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>{item.renter.name}</Text>
            <StarRating
              rating={item.rating / 2}
              onChange={() => {}}
              starSize={25}
              color="#f1c40f"
            />
            <Text style={styles.content}>{item.content}</Text>
            {item.medias?.length > 0 &&
              item.medias.map((media, index) => (
                <Image
                  key={index}
                  source={{ uri: media }}
                  style={styles.media}
                />
              ))}
            <Text style={styles.date}>{formatDateTime(item.updatedAt)}</Text>
            {item.children?.length > 0 && (
              <View style={styles.childrenContainer}>{renderChildren}</View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={renderReviewItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingTop: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },
  media: {
    width: 130,
    height: 140,
    margin: 8,
    resizeMode: "cover",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  childrenContainer: {
    marginTop: 16,
    // paddingLeft: 16,
  },
  childReview: {
    padding: 8,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  nameInitials: {
    backgroundColor: "#f4f4f5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  initials: {
    fontSize: 16,
    fontWeight: "500",
    color: "#09090b",
  },
});

export default ShowReviews;
