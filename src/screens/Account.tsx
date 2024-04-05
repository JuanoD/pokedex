import userAtom from "@/atoms/userAtom";
import LoginForm from "@/components/account/LoginForm";
import UserData from "@/components/account/UserData";
import { useAtomValue } from "jotai";
import { SafeAreaView } from "react-native";

export default function Account() {
  const auth = useAtomValue(userAtom);
  return <SafeAreaView>{auth ? <UserData /> : <LoginForm />}</SafeAreaView>;
}
