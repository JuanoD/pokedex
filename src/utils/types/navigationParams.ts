import { ParamListBase } from "@react-navigation/native";

export interface PkParamListBase extends ParamListBase {
  PokemonStack: {
    name: string;
  };
}
