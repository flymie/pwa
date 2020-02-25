import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increaseAction } from './action';
import style from './style.less';
import AntForm from './jsx/antForm';
// import MyForm from './jsx/list';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <AntForm {...this.props} />
        {/*<MyForm />*/}
      </React.Fragment>
    );
  }
}

Container.propTypes = {
};

const mapStateToProps = state => Object.assign({}, state.login);
export default connect(
  mapStateToProps,
)(Container);
