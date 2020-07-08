import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Charts',
        link: '/pages/charts/chartjs',
      },
    ],
  },
];
