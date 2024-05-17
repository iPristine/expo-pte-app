import {usePathname, useRouter} from "expo-router"
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native"
import {observer} from "mobx-react-lite"
import {isAndroid} from "../platform"
import {Icon, Searchbar, useTheme} from "react-native-paper";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import {useUserContext} from "@/src/modules/user/use-user-context";
import {useChapterContext} from "../../chapter/use-chapter-context";


export const Header = observer(() => {
    const pathname = usePathname()
    const router = useRouter()
    const {sectionsStore} = useSectionContext()
    const {userStore} = useUserContext()
    const {chaptersAction, chaptersStore} = useChapterContext()
    const {
        colors: {
            background
        }
    } = useTheme()


    const isHome = pathname === "/"

    const handleBack = () => {
        router.back()
    }

    const onSearchChange = (text: string) => {
        chaptersStore.searchQuery.setData(text)

        if(text.length > 3){
            chaptersAction.searchChapters()
        }
    }

    return (
        <View style={{backgroundColor: background}}>
            {isAndroid && (
                <StatusBar animated barStyle="dark-content" backgroundColor={background}/>
            )}
            <SafeAreaView style={[layoutStyles.moreHeaderContainer, {backgroundColor: background}]}>
                <View style={layoutStyles.headerBox}>
                    <View style={layoutStyles.iconBox}>
                        {isHome ? (
                            <TouchableOpacity onPress={sectionsStore.sectionsMenu.handleOpen}>
                                <Icon source="book-multiple-outline" size={26}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleBack}>
                                <Icon source="arrow-left-circle" size={26}/>
                            </TouchableOpacity>
                        )}

                    </View>

                    {isHome && (
                        <Searchbar
                            placeholder="Поиск"
                            style={{width: 200}}
                            value={chaptersStore.searchQuery.data || ""}
                            onChangeText={onSearchChange}
                            onIconPress={chaptersAction.searchChapters}
                            onSubmitEditing={chaptersAction.searchChapters}
                        />
                    )
                    }
                    <View style={layoutStyles.iconBoxContainer}>
                        <TouchableOpacity onPress={userStore.userMenuModal.handleOpen}>
                            <Icon source="account" size={26}/>
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
        height: isAndroid
            ? Dimensions.get("window").height / 10
            : Dimensions.get("window").height / 6,
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
})
