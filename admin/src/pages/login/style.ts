import styled from 'styled-components';

export const LoginWapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #2b4b6b;
    .box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 5px;
        padding: 0 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .title {
            font-weight: 700;
            width: 100%;
            text-align: center;
            font-size: 20px;
            margin: 20px 0;
        }
        #components-form-demo-normal-login .login-form {
            max-width: 300px;
        }
        #components-form-demo-normal-login .login-form-forgot {
            float: right;
        }
        #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
            float: left;
        }
        #components-form-demo-normal-login .login-form-button {
            width: 100%;
        }
        .ant-btn-primary {
            width: 100%;
            margin-top: 10px;
        }
    }
`