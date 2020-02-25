import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';

class NormalLoginForm extends React.Component {
  render() {
    const {
      form: {
        getFieldDecorator,
        validateFields,
      },
    } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
    return (
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Please input your username!',
            }],
          })(
            <Input
              prefix={(
                <Icon
                  type="user" style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              )}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your Password!',
            }],
          })(
            <Input
              prefix={(
                <Icon
                  type="lock"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              )}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.shape().isRequired,
};

export default Form.create({
  name: 'normal_login',
})(NormalLoginForm);
