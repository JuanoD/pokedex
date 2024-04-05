import { atom } from "jotai";
import type { userDetails } from "@/utils/fakeData/user";

const userAtom = atom<typeof userDetails | null>(null);

export default userAtom;
