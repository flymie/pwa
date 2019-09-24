import React from 'react';
import { connect } from 'react-redux';
import style from './style.less';

class Container extends React.Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1 className={`${style.title} title`}>404，可能搞错了～</h1>
      </div>
    );
  }
}

Container.propTypes = {
};

const mapStateToProps = state => Object.assign({}, state.error);
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Container);
