import { Avatar, useTheme } from 'react-native-paper';
import { TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { View, Text } from '@/components/Themed';
import { useState } from 'react';
import { UserFavoritesEntity } from '@/src/modules/user/infra/types/favoraties.entity';
import { FavorateCard } from './favorate-card';

type Props = {
  chapter: UserFavoritesEntity
}

export const FavorateAppendCard = observer(({ chapter }: Props) => {
  const { colors: { background, onBackground, backdrop } } = useTheme()
  const [isOpen, setIsOpen] = useState(false);
  const ids = chapter.favorites.reduceRight((acc, curr) => [...acc, acc.length], [] as number[]);

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={{ borderBottomColor: backdrop, borderBottomWidth: 3, maxWidth: "100%", flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: background }}>
          <Avatar.Icon size={45} icon="book-arrow-right-outline" />
          <View style={{ backgroundColor: background, flexDirection: "column", marginLeft: 5, width: "75%" }}>
            <Text style={{ marginLeft: 0, marginRight: "auto", fontSize: 18, fontWeight: "bold", color: onBackground }}>{chapter.name.split(' ')[0].toLowerCase() === 'глава' ? chapter.name.split(' ').slice(3).join(' ') : chapter.name}</Text>
          </View>
          {/* <TouchableOpacity onPress={handleStartClick}><Avatar.Icon size={25} icon={starIconName} /></TouchableOpacity> */}
        </View>
      </TouchableOpacity>
      {isOpen && (
        ids.map((favorite) => (
          <FavorateCard key={`favorate-card-${chapter.id}-${favorite}`} chapterId={chapter.id} chapter={chapter.favorites[favorite]} />
        ))
      )}
    </>
  )
})