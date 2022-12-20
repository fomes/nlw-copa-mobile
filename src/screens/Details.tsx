import { HStack, Toast, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Guesses } from "../components/Guesses";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";

interface RouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<"Palpites" | "Ranking">(
    "Palpites"
  );
  const [poolDetails, setPoolDetails] = useState<PoolCardPros>(
    {} as PoolCardPros
  );
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  const handleCodeShare = async () => {
    Share.share({
      message: poolDetails.code,
    });
  };

  const fetchPoolsDetails = async () => {
    try {
      const resp = await api.get(`/pools/${id}`);
      setPoolDetails(resp.data.pool);
    } catch (err) {
      console.log(err);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoolsDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor={"gray.800"} p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "Palpites"}
              onPress={() => setOptionSelected("Palpites")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "Ranking"}
              onPress={() => setOptionSelected("Ranking")}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
