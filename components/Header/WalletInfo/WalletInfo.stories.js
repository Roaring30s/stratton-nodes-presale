import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MetamaskStatus } from "../../../util/metamask";
import { WalletInfo } from './WalletInfo';

export default {
  title: 'Components/Header/WalletInfo',
  component: WalletInfo,
}

const Template = (args) => <WalletInfo {...args} />;
export const Connected = Template.bind({});
Connected.args = {
  status: MetamaskStatus.Connected,
  account: '0x23E51111111111111111111111111111111164E8',
  userBalance: 4.5,
};

export const NotConnected = Template.bind({});
NotConnected.args = {
  status: MetamaskStatus.NotConnected,
};
