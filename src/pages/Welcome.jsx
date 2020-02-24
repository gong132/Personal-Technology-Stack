import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="前端技术栈网址"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="http://www.html5plus.org/doc/h5p.html">
          <FormattedMessage
            id="app.welcome.link.block-list"
            defaultMessage="H5开发接口"
          />
        </a>
      </Typography.Text>
      {/* <CodePreview> npm run ui</CodePreview> */}
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://uniapp.dcloud.io/quickstart"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="uni-app开发手册" />
        </a>
        <span style={{display:'inline-block', width:'30px'}}></span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/dcloudio/uni-app"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="uni-app Github" />
        </a>
      </Typography.Text>
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ant.design/docs/react/introduce"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="antd design 官网" />
        </a>
      </Typography.Text>
      {/* <CodePreview> npm run fetch:blocks</CodePreview> */}
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://react.docschina.org/docs/getting-started.html"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="React 官网" />
        </a>
      </Typography.Text>
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://developers.weixin.qq.com/miniprogram/dev/devtools/qywx-dev.html"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="微信小程序开发文档" />
        </a>
      </Typography.Text>
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://nodejs.cn/api/"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="Nodejs开发文档" />
        </a>
      </Typography.Text>
      <br />
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://umijs.org/zh/guide/"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="umijs官网" />
        </a>
      </Typography.Text>
    </Card>
  </PageHeaderWrapper>
);
