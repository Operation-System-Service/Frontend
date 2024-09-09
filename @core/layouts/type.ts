import { Settings } from "@/@core/context/settingsContext"
import { AppBarProps, PaletteMode, SwipeableDrawerProps, SxProps, Theme } from "@mui/material"
import { ReactNode } from "react"

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar'

export type Skin = 'default' | 'bordered'

export type Mode = PaletteMode | 'semi-dark'

export type ContentWidth = 'full' | 'boxed'

export type AppBar = 'fixed' | 'static' | 'hidden'

export type Footer = 'fixed' | 'static' | 'hidden'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type VerticalNavToggle = 'accordion' | 'collapse'

export type NavSectionTitle = {
	auth?: boolean
	action?: string
	subject?: string
	sectionTitle: string
}

export type NavGroup = {
	icon?: string
	title: string
	auth?: boolean
	action?: string
	subject?: string
	badgeContent?: string
	children?: (NavGroup | NavLink)[]
	badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavLink = {
	icon?: string
	path?: string
	title: string
	auth?: boolean
	action?: string
	subject?: string
	disabled?: boolean
	badgeContent?: string
	externalLink?: boolean
	openInNewTab?: boolean
	badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type ExtendedNavLink = NavLink & {
	allowedRoles: string[]
}

export type NavItemsType = (ExtendedNavLink | NavLink | NavGroup | NavSectionTitle)[]

export type FooterProps = {
	sx?: SxProps<Theme>
	content?: (props?: any) => ReactNode
}

export type VerticalLayoutProps = {
	appBar?: {
		componentProps?: AppBarProps
		content?: (props?: any) => ReactNode
	}
	navMenu: {
		lockedIcon?: ReactNode
		unlockedIcon?: ReactNode
		navItems?: NavItemsType
		content?: (props?: any) => ReactNode
		branding?: (props?: any) => ReactNode
		afterContent?: (props?: any) => ReactNode
		beforeContent?: (props?: any) => ReactNode
		componentProps?: Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>
	}
}

export type LayoutProps = {
	hidden: boolean
	settings: Settings
	children: ReactNode
	footerProps?: FooterProps
	contentHeightFixed?: boolean
	scrollToTop?: (props?: any) => ReactNode
	saveSettings: (values: Settings) => void
	verticalLayoutProps: VerticalLayoutProps
}