import {observer} from "mobx-react-lite";
import {Portal, Modal} from "react-native-paper";
import {StyleSheet} from "react-native";
import {useSectionContext} from "@/src/modules/section/use-section-context";
import { Text } from '@/components/Themed';
import { white } from "@/src/style/colors";
import { Menu } from 'react-native-paper';
import {SectionEntity} from "@/src/modules/section/infra/types/section.entity";



export const SectionsModal = observer(()=>{
        const {sectionsStore} =useSectionContext()
    const containerStyle = {backgroundColor: white, padding: 20};

       const handleOnSectionClick = (section: SectionEntity) => {
           sectionsStore.sectionDetailsId.setData(section.id)
              sectionsStore.sectionsMenu.handleClose()
       }

    return (
            <Portal>
                <Modal
                    visible={sectionsStore.sectionsMenu.isOpen}
                    onDismiss={sectionsStore.sectionsMenu.handleClose}
                    contentContainerStyle={containerStyle}
                >
                    <Text>Содержание:</Text>
                    {sectionsStore.sections.data?.map(section => (
                        <Menu.Item
                            key={section.id}
                            onPress={() => {handleOnSectionClick(section)}}
                            title={section.name}
                        />
                    ))}

                </Modal>
            </Portal>
        )
    }
)

