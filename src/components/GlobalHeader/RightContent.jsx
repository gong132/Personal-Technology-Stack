import { Icon, Tooltip, Drawer } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  console.log(props)
  const [visible, setVisible] = useState(false)

  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const showDrawer = () => {
    props.dispatch({
      type:'global/setState',
      payload: { showDrawer: !props.showDrawer}
    })
  }


  return (
    <div className={className}>
      <Tooltip placement="bottom" title='日历'>
        <Icon size='large' type='calendar' onClick={showDrawer} />
      </Tooltip>  
    </div>
  );
};

export default connect(({ settings, global }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  showDrawer: global.showDrawer,
}))(GlobalHeaderRight);
