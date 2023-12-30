import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { MdOutlineDarkMode } from "react-icons/md"

const ButtonThemeSwitcher = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme({
        keepTransitions: true
    })
    const dark = colorScheme === 'dark'

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title={dark ? "Light theme" : "Dark theme"}
            size={36}
        >
            <MdOutlineDarkMode size={26}/>
        </ActionIcon>
    );
}

export default ButtonThemeSwitcher