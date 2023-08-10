import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import {
  Box,
  H5,
  H4,
  Label,
  Input,
  FormGroup,
  Button,
  Text,
  MessageBox,
  MadeWithLove,
  themeGet,
} from "@adminjs/design-system";
import { useTranslation } from "adminjs";
import { ReduxState } from "adminjs";

export const LoginWrapper: React.FC<Record<string, unknown>> = (props) => {
  return <Login {...(props as LoginProps)} />;
};

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const StyledLogo = styled.img`
  max-width: 250px;
  margin: ${themeGet("space", "md")} 0;
`;

export type LoginProps = {
  message?: string;
  action: string;
};

export const Login: React.FC<LoginProps> = (props) => {
  const { action, message } = props;
  const {
    translateLabel,
    translateButton,
    translateProperty,
    translateMessage,
  } = useTranslation();
  const branding = useSelector((state: ReduxState) => state.branding);

  return (
    <>
      <Wrapper
        flex
        variant="grey"
        style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <Box
          bg="rgb(40, 40, 40)"
          height="440px"
          flex
          width={[1, 2 / 3, "auto"]}>
          <Box
            as="form"
            action={action}
            method="POST"
            p="20px"
            flexGrow={1}
            width={["100%", "100%", "480px"]}>
            <H5 textAlign="center">
              {branding.logo ? (
                <StyledLogo
                  src={
                    "https://d3lqz0a4bldqgf.cloudfront.net/seize_images/Seize_Logo_Glasses.png"
                  }
                  alt={branding.companyName}
                />
              ) : (
                branding.companyName
              )}
            </H5>
            <H4
              mt="xl"
              marginBottom="xxl"
              textAlign="center"
              style={{ color: "white" }}>
              <b>SEIZE.IO ADMIN</b>
            </H4>
            {message && (
              <MessageBox
                my="lg"
                message={
                  message.split(" ").length > 1
                    ? message
                    : translateMessage(message)
                }
                variant="danger"
              />
            )}
            <FormGroup>
              <Label required style={{ color: "white" }}>
                {translateProperty("username")}
              </Label>
              <Input
                name="email"
                style={{ backgroundColor: "white", color: "black" }}
                placeholder={translateProperty("username")}
              />
            </FormGroup>
            <FormGroup>
              <Label required style={{ color: "white" }}>
                {translateProperty("password")}
              </Label>
              <Input
                type="password"
                name="password"
                style={{ backgroundColor: "white", color: "black" }}
                placeholder={translateProperty("password")}
                autoComplete="new-password"
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button
                variant="primary"
                style={{ backgroundColor: "white", color: "black" }}>
                {translateButton("login")}
              </Button>
            </Text>
          </Box>
        </Box>
        {branding.withMadeWithLove ? (
          <Box mt="xxl">
            <MadeWithLove />
          </Box>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Login;
