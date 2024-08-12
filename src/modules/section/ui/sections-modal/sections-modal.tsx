import { observer } from "mobx-react-lite";
import { Icon, Portal, useTheme } from "react-native-paper";
import { useSectionContext } from "@/src/modules/section/use-section-context";
import { SectionEntity } from "@/src/modules/section/infra/types/section.entity";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const SectionsModal = observer(() => {
  const { sectionsStore } = useSectionContext();
  const {
    colors: { surface, background, primaryContainer, onPrimary, onBackground },
  } = useTheme();

  const [activateId, setActivateId] = useState(
    sectionsStore.sections.data?.[0].id
  );

  const handleOnSectionClick = (section: SectionEntity) => {
    sectionsStore.sectionDetailsId.setData(section.id);
    setActivateId(section.id);
    sectionsStore.sectionsMenu.handleClose();
  };

  useEffect(() => {
    if (!sectionsStore.sectionsMenu.isOpen) {
      return undefined;
    }

    const onHardwareBackPress = () => {
      if (sectionsStore.sectionsMenu.isOpen) {
        sectionsStore.sectionsMenu.handleClose();
      }

      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress
    );
    return () => subscription.remove();
  }, [sectionsStore.sectionsMenu.handleClose, sectionsStore.sectionsMenu.isOpen]);

  return (
    <Portal>
      <SafeAreaView
        style={{
          backgroundColor: surface,
          position: "absolute",
          width: "70%",
          height: "100%",
          display: sectionsStore.sectionsMenu.isOpen ? "flex" : "none",
          elevation: 10,
        }}
      >
        <ScrollView scrollEnabled={true}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "5%"}}>
          <Text
            style={{
              marginTop: "5%",
              marginBottom: "6%",
              marginLeft: "5%",
              fontSize: 20,
              color: onBackground,
            }}
          >
            Содержание:
          </Text>
          <TouchableOpacity onPress={sectionsStore.sectionsMenu.handleClose}><Icon source="close" size={35} /></TouchableOpacity>
          </View>
          {sectionsStore.sections.data?.map((section) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                maxWidth: "100%",
                marginBottom: "3%",
                padding: "4%",
                backgroundColor:
                  activateId === section.id ? primaryContainer : background,
              }}
              onPress={() => handleOnSectionClick(section)}
              key={section.id}
            >
              <Text style={{ color: onBackground }}>{section.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: "#000000",
          position: "absolute",
          display: sectionsStore.sectionsMenu.isOpen ? "flex" : "none",
          opacity: 0.5,
          width: "30%",
          height: "100%",
          marginLeft: "70%",
        }}
        onPress={sectionsStore.sectionsMenu.handleClose}
      />
    </Portal>
  );
});
