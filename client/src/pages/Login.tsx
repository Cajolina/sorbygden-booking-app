import { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useLoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css";
function Login() {
  const navigate = useNavigate();
  const { loginAdmin, loggedInAdmin, authorizeAdmin } = useLoginContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    authorizeAdmin();
  }, []);

  const onFinish = async () => {
    const admin = { email, password };
    const response = await loginAdmin(admin);
    if (
      typeof response === "string" &&
      response === "Wrong password or username"
    ) {
      setErrorMessage(response);
      setLoginSuccess(false);
    } else {
      setErrorMessage("");
      form.resetFields();
      setLoginSuccess(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // Reset login success when logged out
  useEffect(() => {
    if (!loggedInAdmin) {
      setLoginSuccess(false);
    }
  }, [loggedInAdmin]);

  // Navigate to the admin panel
  useEffect(() => {
    if (loginSuccess) {
      navigate("/adminpanel");
    }
  }, [loginSuccess, navigate]);

  // Redirect to admin panel if already logged in
  useEffect(() => {
    if (loggedInAdmin) {
      navigate("/adminpanel");
    }
  }, [loggedInAdmin, navigate]);

  return (
    <div className="LoginContainer">
      {/* Create a loading spinner later 
      {loginSuccess ? (
        
      ) : (
        <> */}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="E-postadress"
          name="email"
          rules={[{ required: true, message: "Ange din e-postadress" }]}
        >
          <Input
            placeholder="test@email.se"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Lösenord"
          name="password"
          rules={[{ required: true, message: "Ange ditt lösenord" }]}
        >
          <Input.Password
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginTop: "1rem" }}
        />
      )}
      {/* </>
      )} */}
    </div>
  );
}

export default Login;
