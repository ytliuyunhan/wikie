import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Feed from './Feed';
import * as feedActions from '../../actions/feedActions';

class FeedContainer extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired
  }

  render() {
    return (
      <Feed
        feed={this.props.feed}
        fetchFeatured={this.props.fetchFeatured}
      />
    );
  }
}

function mapStateToProps({feed}) {
  return {
    feed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
