import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increaseAction } from './action';
import style from './style.less';

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
    const arr = [1, 2, 3];
    const { value, dispatch } = this.props;
    return (
      <div className="a">
        <div>
          <span className={style.flag}>{value}</span>
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
        <h1 className="a_b">hello, world!</h1>
        <p className="background">test speed</p>
        <img src={require('Images/userImg240.png')} alt="" />
        {
          arr.map((v, index) => (
            <p key={`${index + 1}`}>{v}</p>
          ))
        }
        <Link to={`/routerV4/1?a=${encodeURIComponent('4&&-.2')}&b=${encodeURIComponent('5=&')}`}>传入param,query</Link>
        <p>
          <Link to={'/uRLSearchParams/1?a=4&&-.2)}&b=5=&'}>通过URLSearchParams解析查询的字段</Link>
        </p>
        <div>
          <Link to="/home/list2/a">homeList2</Link>
          <div>
            <a href="/home/list2/a">homeList2</a>
          </div>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  value: PropTypes.number.isRequired,
  // onIncreaseClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state.homeList);
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Container);
