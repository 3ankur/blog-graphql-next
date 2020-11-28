import React from "react";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";

import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export const NavBar: React.FC<NavBarProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const [{ data, fetching }] = useMeQuery();
  const [,logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
  } else if (!data.me) {
    body = (
      <>
        <MenuItems>
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </MenuItems>
        <MenuItems>
          {" "}
          <NextLink href="/register">
            <Link>Login</Link>
          </NextLink>
        </MenuItems>
        <MenuItems>Blog</MenuItems>
      </>
    );
  } else {
    body = (
      <Box>
        <label>Hi, {data.me.username}</label> |
        <Button onClick={()=>logout()}  ml={3} color="blue" variant="link">
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Flex
      as="nav"
      width="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Blog'Me
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        flexDirection="row-reverse"
      >
        {body}
      </Box>

      {/* <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}
    </Flex>
  );
};
