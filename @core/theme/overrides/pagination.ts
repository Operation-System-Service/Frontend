import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

import { OwnerStateThemeType } from "."

const Pagination = () => {
	return {
		MuiPaginationItem: {
			styleOverrides: {
				outlined: ({ theme }: OwnerStateThemeType) => ({
					borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`,
				}),
				outlinedPrimary: ({ theme }: OwnerStateThemeType) => ({
					'&.Mui-selected': {
						backgroundColor: hexToRGBA(theme.palette.primary.main, 0.12),
						'&:hover': {
							backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.24)} !important`,
						},
					},
				}),
				outlinedSecondary: ({ theme }: OwnerStateThemeType) => ({
					'&.Mui-selected': {
						backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.12),
						'&:hover': {
							backgroundColor: `${hexToRGBA(theme.palette.secondary.main, 0.24)} !important`,
						},
					},
				}),
				rounded: {
					borderRadius: 8,
				},
			},
		},
	}
}

export default Pagination
