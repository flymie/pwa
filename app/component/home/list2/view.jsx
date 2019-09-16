import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increaseAction, init } from './action';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  static asyncData(store, ctx) {
    store.dispatch(init({
      q: ctx.params.a,
    }));
  }

  componentDidMount() {
    // const { dispatch, match } = this.props;
    // dispatch(init({
    //   q: match.params.a,
    // }));
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const { value, dispatch } = this.props;
    return (
      <div className="a">
        <div>
          <span>{value}</span>
          <button
            onClick={() => {
              dispatch(increaseAction({
                q: 'k',
              }));
            }}
          >
            getMusic
          </button>
        </div>
        <h1 className="a_b">homeList2</h1>
      </div>
    );
  }
}

Container.propTypes = {
  value: PropTypes.number.isRequired,
  // onIncreaseClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape(),
};

const mapStateToProps = state => Object.assign({}, state.homeList2);
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Container);
