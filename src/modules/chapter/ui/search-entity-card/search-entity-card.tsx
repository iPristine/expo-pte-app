import { Avatar, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SearchEntity } from "@/src/modules/chapter/infra/types/search.entity";
import { View, Text } from "@/components/Themed";
import { useChapterContext } from "../../use-chapter-context";

type Props = {
  searchEntity: SearchEntity;
};

export const SearchEntityCard = ({ searchEntity }: Props) => {
  const router = useRouter();
  const { chaptersStore } = useChapterContext();
  const {colors: {background, onBackground, backdrop}} = useTheme()
  // const [isFavorate, setIsFavorate] = useState(false);

  const handleClick = () => {
    chaptersStore.isSearching.setData(true);
    router.push(`/chapter/${searchEntity.id}`);
  };

  // const starIconName = isFavorate ? "star" : "star-outline"

  return (
    <TouchableOpacity onPress={handleClick}>

      <View style={{borderBottomColor: backdrop, borderBottomWidth: 3, maxWidth: "100%", flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: background}}>
        <Avatar.Icon size={45} icon="book-arrow-right-outline" />
        <View style={{ backgroundColor: background, flexDirection: "column", marginLeft: 10, width: "75%"}}>
          <Text style={{ marginLeft: 0, marginRight: "auto", fontSize: 18, fontWeight: "bold", color: onBackground}}>{searchEntity.name}</Text>
          {/* <ChapterContent chapterContent={searchEntity.chapterName} /> */}
        </View>
        {/* <TouchableOpacity onPress={() => setIsFavorate(!isFavorate)}><Avatar.Icon size={25} icon={starIconName} /></TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};
