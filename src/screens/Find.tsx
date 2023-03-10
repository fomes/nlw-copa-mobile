import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  const handleJoinPool = async () => {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        return toast.show({
          title: "Informe o código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: `Você entrou no bolão ${code}`,
        placement: "top",
        bgColor: "green.500",
      });

      setCode("");
      navigate("pools");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response?.data?.message === "Bolão não encontrado!") {
        setCode("");
        return toast.show({
          title: "Não foi possível encontrar o bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (err.response?.data?.message === "Você já participa desse bolão!") {
        setCode("");
        return toast.show({
          title: "Você já está nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily={"heading"}
          color="white"
          fontSize={"xl"}
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único.
        </Heading>

        <Input
          mb={2}
          autoCapitalize="characters"
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setCode}
          value={code}
        />

        <Button title="BUSCAR BOLÃO" onPress={handleJoinPool}></Button>
      </VStack>
    </VStack>
  );
}
