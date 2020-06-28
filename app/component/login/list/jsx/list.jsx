import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { increaseAction } from '../action';
import style from '../style.less';
import { valiFormSubmit, valiCheckForm, removeValiCheckForm } from 'appPath/lib/jsFormValidateNative';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const inputs = document.querySelectorAll('.checkarea');
    valiCheckForm(inputs);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    const inputs = document.querySelectorAll('.checkarea');
    removeValiCheckForm(inputs);
  }

  render() {
    function submit() {
      valiFormSubmit(document.querySelectorAll('.checkarea'), () => {
        alert('验证成功');
      });
    }
    return (
      <React.Fragment>
        <div className="formWrap">
          <label className="item">
            <div className="itemText">手机号码</div>
            <div className="itemControl">
              <Input
                className="checkarea"
                data-empty="请输入手机号码"
                data-pattern="/^\s*1[0-9]{10}\s*$/"
                data-error="请输入正确的手机号"
              />
            </div>
          </label>
        </div>
        <Button onClick={() => {
          submit();
        }}
        >
          提交
        </Button>
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
