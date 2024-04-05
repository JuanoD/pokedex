import Paginate from "@/utils/types/paginate";

export type PokemonListItem = {
  name: string;
  url?: string;
};

/**
 * @url https://pokeapi.co/api/v2/pokemon
 * @param limit number
 * @param offset number
 * @see https://pokeapi.co/docs/v2#pokemon
 */
export type PaginatedPokemonList = Paginate<PokemonListItem>;
