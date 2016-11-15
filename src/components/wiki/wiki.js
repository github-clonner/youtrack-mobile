/* @flow */
import {Linking, WebView} from 'react-native';
import Router from '../router/router';
import React, {PropTypes, Component} from 'react';
import {extractId} from '../open-url-handler/open-url-handler';
import styles from './wiki.styles';
import template from './wiki.template';

type Props = {
  style: any,
  children: any,
  backendUrl: string,
  attachments: Array<Object>,
  onIssueIdTap: (issueId: string) => any
};

type State = {
  webViewHeight: number
}

export default class Wiki extends Component {
  props: Props;
  state: State;

  static propTypes = {
    onIssueIdTap: PropTypes.func.isRequired,
    attachments: PropTypes.array.isRequired
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      webViewHeight: 0
    };
  }

  handleMessage(event: any) {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.name === 'image-click') {
      const allImagesUrls = this.props.attachments
        .filter(attach => attach.mimeType.includes('image'))
        .map(image => image.url);

      return Router.ShowImage({currentImage: data.src, allImagesUrls});
    }

    if (data.name === 'height-update') {
      this.setState({webViewHeight: data.height});
    }
  }

  handleNavigationChange(event: any) {
    const {url} = event;

    if (url === 'about:blank' || url.indexOf('react-js-navigation') === 0) {
      return false;
    }

    if (url && url.indexOf(`${this.props.backendUrl}/issue/`) !== -1 && extractId(url)) {
      this.props.onIssueIdTap && this.props.onIssueIdTap(extractId(url) || '');
      return false;
    }

    if (url && url !== 'about:blank') {
      Linking.openURL(url);
      return false;
    }
  }

  render() {
    const child = Array.isArray(this.props.children) ? this.props.children.join('') : this.props.children;

    return <WebView
      automaticallyAdjustContentInsets={true}
      onNavigationStateChange={(...args) => this.handleNavigationChange(...args)}
      scalesPageToFit={false}
      scrollEnabled={false}
      onMessage={(...args) => this.handleMessage(...args)}
      style={[styles.webView, {height: this.state.webViewHeight}]}
      source={{html: template(child), baseUrl: 'about:blank'}}
    />;
  }
}

const decorateRawText = (source: string, serverUrl: string) => {
  if (!serverUrl) {
    return source;
  }
  const result = source
    .replace(/href="\//ig, `href="${serverUrl}/`)
    .replace(/src="\//ig, `src="${serverUrl}/`);
  return result;
};

export {decorateRawText};
