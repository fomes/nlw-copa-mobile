import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export function SignIn() {
  const { singIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        title="ENTRAR COM GOOGLE"
        type="SECONDARY"
        mt={12}
        leftIcon={
          <Icon as={Fontisto} name="google" color={"white"} size="md" />
        }
        onPress={singIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />

      <Text color={"white"} textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{"\n"} do seu e-mail para criação
        da sua conta.
      </Text>
    </Center>
  );
}
