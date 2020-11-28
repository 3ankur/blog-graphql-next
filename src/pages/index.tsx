import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/core";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { NavBar } from "../components/navbar";

const Index = () => (
  <Container>
    <NavBar />
    <Main>ssd</Main>
    <DarkModeSwitch />
  </Container>
);

export default Index;
