import {observer} from "mobx-react-lite";
import {Portal, Modal} from "react-native-paper";
import {StyleSheet} from "react-native";
import { Text } from '@/components/Themed';
import { white } from "@/src/style/colors";
import { Menu } from 'react-native-paper';
import {useUserContext} from "@/src/modules/user/use-user-context";
import {useAuthContext} from "@/src/modules/auth/use-auth-context";
import {router} from "expo-router";



export const UserMenuModal = observer(()=>{
        const { userStore, userAction} =useUserContext()
    const {authAction} = useAuthContext()
    const containerStyle = {backgroundColor: white, padding: 20};

       const handleFavoratesClick = () => {
           console.log("NAVIGATE TO PROFILE")

       }

       const handleProfileClick = () => {
           router.push("/profile")
           userStore.userMenuModal.handleClose()
       }

       const handleSignOutClick = () => {
           userStore.userMenuModal.handleClose()
             authAction.handleSignOut()
       }

    return (
            <Portal>
                <Modal
                    visible={userStore.userMenuModal.isOpen}
                    onDismiss={userStore.userMenuModal.handleClose}
                    contentContainerStyle={containerStyle}
                >
                    <Text>Меню</Text>
                    <Menu.Item
                        onPress={handleProfileClick}
                        title={'Профиль'}
                    />
                    <Menu.Item
                        onPress={handleFavoratesClick}
                        title={'Избранное'}
                    />

                    <Menu.Item
                        onPress={handleSignOutClick}
                        title={'Выйти'}
                    />


                </Modal>
            </Portal>
        )
    }
)

