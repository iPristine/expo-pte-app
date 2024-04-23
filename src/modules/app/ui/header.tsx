import { usePathname, useRouter } from "expo-router"
import { useState } from "react"
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { observer } from "mobx-react-lite"
import { isAndroid } from "../platform"
import {white} from "@/src/style/colors";
import {Icon, Searchbar} from "react-native-paper";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {useUserContext} from "@/src/modules/user/use-user-context";
import { useChapterContext } from "../../chapter/use-chapter-context";

export const Header = observer(() => {
  const pathname = usePathname()
  const router = useRouter()
  const {sectionsStore} = useSectionContext()
  const {userStore} = useUserContext()
  const {chaptersAction, chaptersStore} = useChapterContext()

  const [serach, setSearch] = useState("")

  const isHome = pathname === "/"

  const handleBack = () => {
    router.back()
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      {isAndroid && (
        <StatusBar animated barStyle="dark-content" backgroundColor={white} />
      )}
      <SafeAreaView style={layoutStyles.moreHeaderContainer}>
        <View style={layoutStyles.headerBox}>
          <View style={layoutStyles.iconBox}>
            {isHome ? (
                <TouchableOpacity onPress={sectionsStore.sectionsMenu.handleOpen}>
                  <Icon source="book-multiple-outline" size={26}  />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleBack}>
                  <Icon source="arrow-left-circle" size={26}  />
                </TouchableOpacity>
            )}

          </View>

          {isHome && <Searchbar 
                placeholder="Search"
                style={{width: 200}} 
                value={chaptersStore.searchValidator.values.searchQuery} 
                onChangeText={chaptersStore.searchValidator.handlers.searchQuery} 
                onIconPress={chaptersAction.searchChapters}
                />
                }
          <View style={layoutStyles.iconBoxContainer}>
            <TouchableOpacity onPress={userStore.userMenuModal.handleOpen}>
              <Icon source="account" size={26}  />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
})

const layoutStyles = StyleSheet.create({
  tabBarIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  moreHeaderContainer: {
    justifyContent: "center",
    marginTop: isAndroid ? 24 : 0,
    backgroundColor: white,
    height: isAndroid
      ? Dimensions.get("window").height / 18
      : Dimensions.get("window").height / 10,
  },
  headerBox: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    paddingHorizontal: 10,
  },
  notificationCircle: {
    position: "absolute",
    top: 0,
    left: 15,
  },
  headerText: {

  },
})
